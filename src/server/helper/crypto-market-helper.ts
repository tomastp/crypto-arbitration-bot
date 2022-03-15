import { env } from '../environment/env'
import { ICryptoMarketBodyRequestTransaction } from '../interface/ICryptoMarketBodyRequestTransaction'

export class CryptoMarketExchangeHelper {

    static symbol: string = 'BTCARS'
    static exchangeName: string = 'CryptoMarket'

    /**
     * Set the request parameters to send in the post request
     * to sell crypto
     * @param major number
     * @param origin_id number
     * @returns ICryptoMarketBodyRequestTransaction
     */
    setRequestSellCrypto(major: number, origin_id: number): ICryptoMarketBodyRequestTransaction {
        let rtn: ICryptoMarketBodyRequestTransaction = {
            headers: {
                key: env().appKeyBitso!,
                signature: env().appSignatureBitso!,
                nonce: env().appSignatureBitso!,
            },
            body: {
                symbol: CryptoMarketExchangeHelper.symbol,
                side: 'sell',
                type: 'merket',
                major: major,
                origin_id: origin_id
            }
        }
        return rtn
    }

    /**
     * Set the request parameters to send in the post request
     * to buy crypto
     * @param major number
     * @param origin_id number
     * @returns ICryptoMarketBodyRequestTransaction
     */
    setRequestBuyCrypto(major: number, origin_id: number): ICryptoMarketBodyRequestTransaction {
        let rtn: ICryptoMarketBodyRequestTransaction = {
            headers: {
                key: env().appKeyBitso!,
                signature: env().appSignatureBitso!,
                nonce: env().appSignatureBitso!,
            },
            body: {
                symbol: CryptoMarketExchangeHelper.symbol,
                side: 'buy',
                type: 'merket',
                major: major,
                origin_id: origin_id
            }
        }
        return rtn
    }

}
