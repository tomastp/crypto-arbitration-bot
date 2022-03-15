import { bitsoExchangeHelper, cryptoMarketExchangeHelper } from '../helper/helper-module'
import { CryptoMarketExchangeHelper, BitsoExchangeHelper } from '../helper'
import { bitsoService, cryptomktService} from '../service/service-module'
import Logger from '../middleware/winston-middleware'
import { Observable , forkJoin} from 'rxjs'
import io from '../config/socket'
import { 
    IExchange,
    IArbitration,
    IMultipleTransactions,
    IBitsoRequest,
    ICryptoMarketRequest
} from '../interface'
import { arbitrationRepository } from '../models/repository/repository-module'

export class ArbitrationController {
  
    public bitsoExchange: IExchange
    public cryptoMatketExchange: IExchange
    private indexOfExchanges: IExchange[]
    private directions: string[] = []

    static arbitrationPercent: number = 5

    static eventSocketUpdatePrice: string = 'update-prices'
    static eventSocketUpdateArbitration: string = 'update-arbitration'

    constructor() {
        this.bitsoExchange = {
            name: BitsoExchangeHelper.exchangeName,
            serviceName: 'bitsoService',
        }

        this.cryptoMatketExchange = {
            name: CryptoMarketExchangeHelper.exchangeName,
            serviceName: 'cryptomktService',
        }

        this.indexOfExchanges = [
            this.bitsoExchange,
            this.cryptoMatketExchange,
        ]

        this.indexOfExchanges.forEach(element => {
            this.directions.push(element.name)
        });
    }

    /**
     * Entry point, this method handle the execution of the arbitration
     */
    public handleArbitration(): void {
        try {
            // Observables
            let bitsoObservable = this.getBitsoTickerObservable()
            let cryptoMarketObservable = this.getCryptoMarketTickerObservable()
            forkJoin([bitsoObservable, cryptoMarketObservable]).subscribe({
                next: (results) => {
                    let payloadBitso = results[0].data.payload
                    this.bitsoExchange.ticker = {
                        symbol: BitsoExchangeHelper.book,
                        high: payloadBitso.high,
                        low: payloadBitso.low,
                        volume: payloadBitso.volume,
                        bid: payloadBitso.bid,
                        ask: payloadBitso.ask,
                    }
                    let payloadCryptoMarket = results[1].data.BTCARS
                    this.cryptoMatketExchange.ticker = {
                        symbol: CryptoMarketExchangeHelper.symbol,
                        high: payloadCryptoMarket.high,
                        low: payloadCryptoMarket.low,
                        volume: payloadCryptoMarket.volume,
                        bid: payloadCryptoMarket.bid,
                        ask: payloadCryptoMarket.ask,
                    }
                    // Socket emit event updating prices
                    io.sockets.emit(ArbitrationController.eventSocketUpdatePrice, {
                        bitso: this.bitsoExchange.ticker,
                        cryptoMarket: this.cryptoMatketExchange.ticker
                    })
                    this.resolveArbitration()
                },
                error: (err) => {
                    Logger.error(JSON.stringify(err))
                }
            })
        } catch (error) {
            Logger.error(JSON.stringify(error))
            throw new Error('Error handling arbiration')
        }
    }

    /**
     * @returns Observable
     */
    private getBitsoTickerObservable(): Observable<any> {
        return bitsoService.getTicker(BitsoExchangeHelper.book)
    }

    /**
     * @returns Observable
     */
     private getCryptoMarketTickerObservable(): Observable<any> {
        return cryptomktService.getTicker(CryptoMarketExchangeHelper.symbol)
    }

    /**
     * Execute the transactions in both exchanges in order to finish the arbiration
     * @param arbitration IArbitration 
     * @param params IMultipleTransactions 
     * @returns void
     */
    private makeTransactions(arbitration: IArbitration, params: IMultipleTransactions): void {
        // sockets.emit() & arbitrationRepository.create(), it's should be after the exchanges transaccions 
        // successed, but in this case we can't make it becouse we haven't credentials
        io.sockets.emit(ArbitrationController.eventSocketUpdateArbitration, {
            message: `New arbitration made! Direction ${arbitration.exchangeDirection} - percent: %${arbitration.arbitrationPercent}`
        })
        arbitrationRepository.create(arbitration)
       
        let observableBitso = bitsoService.postTransaction(params.bitsoParamsRequest)
        let observableCryptoMarket = cryptomktService.postTransaction(params.cryptoMarketParamsRequest)
        forkJoin([observableBitso, observableCryptoMarket]).subscribe({
            next: (results) => {
                let btisoSuccess: boolean = false
                let crmktSuccess: boolean = false
                if (results[0].status === 200) {
                    btisoSuccess = true
                } else {Logger.error('error sending request to Bitso') }
                if (results[1].status === 200) {
                    crmktSuccess = true
                } else {Logger.error('error sending request to Crypto Market') } 

                if (btisoSuccess === true && crmktSuccess === true) {
                    Logger.info(`Arbitration made: ${JSON.stringify(arbitration)}`)
                    io.sockets.emit(ArbitrationController.eventSocketUpdateArbitration, {
                        message: `New arbitration made! Direction ${arbitration.exchangeDirection} - percent: %${arbitration.arbitrationPercent}`
                    })
                    arbitrationRepository.create(arbitration)
                }
            },
            error: (err) => {
                Logger.error(JSON.stringify(err))
            }
        })
    }

    /**
     * This method resolve the arbitration, process the prices get from exchanges
     * and validate if the percentage of gain it's grater than we specifed.
     * If it so, it generate the dat we should send in the post request
     * @return void
     */
     private resolveArbitration(): void {
        let arbitrations = this.compareExchangeTicker()
        arbitrations.forEach(arbitration => {
            if(arbitration.arbitrationPercent >= ArbitrationController.arbitrationPercent) {
                try {
                    switch (arbitration.exchangeDirection) {
                        case BitsoExchangeHelper.exchangeName:
                            // In this direction we sell on Bitso and buy in CryptoMarket
                            let paramsSellBitso: IBitsoRequest = bitsoExchangeHelper.setRequestSellCrypto(1, 1)
                            let paramsBuyCrtMkt: ICryptoMarketRequest = cryptoMarketExchangeHelper.setRequestBuyCrypto(1, 1)
                            let paramsDirectionBitso: IMultipleTransactions = {
                                bitsoParamsRequest:  paramsSellBitso,
                                cryptoMarketParamsRequest: paramsBuyCrtMkt
                            }
                            return this.makeTransactions(arbitration, paramsDirectionBitso)
                        case CryptoMarketExchangeHelper.exchangeName:
                            // In this direction we sell on CryptoMarket and buy in Bitso
                            let paramsBuyBitso: IBitsoRequest = bitsoExchangeHelper.setRequestBuyCrypto(1, 1)
                            let paramsSellCrtMkt: ICryptoMarketRequest = cryptoMarketExchangeHelper.setRequestSellCrypto(1, 1)
                            let paramsDirectionCrpMkt: IMultipleTransactions = {
                                bitsoParamsRequest:  paramsBuyBitso,
                                cryptoMarketParamsRequest: paramsSellCrtMkt
                             }
                            return this.makeTransactions(arbitration, paramsDirectionCrpMkt)
                        default:
                            throw new Error(`Can't resolve direction from Arbitration`);
                    }
                } catch (error) {
                    Logger.error(JSON.stringify(error))    
                    throw new Error('Error resolving arbitration')                
                }
            }
        })
    }

    /**
     * Compare prices from exchanges and process the percentage of gain
     * and the direction that we'll buy or sell our cryptocurrency
     * @returns IArbitration[]
     */
    private compareExchangeTicker(): IArbitration[]{
        let arbirations: IArbitration[] = [];
        this.directions.forEach(direction => {
            const exchangeIteration: IExchange | undefined = this.indexOfExchanges.find(ex => ex.name === direction)
            const exchangeleft: IExchange | undefined = this.indexOfExchanges.find(ex => ex.name != direction)

            // calculate percentage of gain in this direction
            let rawBenefit: number = ( exchangeIteration!.ticker!.ask - exchangeleft!.ticker!.bid ) / exchangeIteration!.ticker!.ask * 100
            let formatBenefit: number = Number(rawBenefit.toFixed(2))

            // Set arbitration
            let newArbitration: IArbitration = {
                exchangeSelling: exchangeIteration!,
                exchangeBuying: exchangeleft!,
                exchangeDirection: direction,
                arbitrationPercent: formatBenefit
            }

            arbirations.push(newArbitration)
        })

        return arbirations        
    }
}
