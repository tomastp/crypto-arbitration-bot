import { env } from '../environment/env'
import { ICryptoMarketRequest } from '../interface'

export class CryptoMarketExchangeHelper {

    static symbol: string = 'BTCARS'
    static exchangeName: string = 'CryptoMarket'

    /**
     * Set the request parameters to send in the post request
     * to sell crypto
     * @param major number
     * @param origin_id number
     * @returns ICryptoMarketRequest
     */
    setRequestSellCrypto(major: number, origin_id: number): ICryptoMarketRequest {
        let rtn: ICryptoMarketRequest = {
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
     * @returns ICryptoMarketRequest
     */
    setRequestBuyCrypto(major: number, origin_id: number): ICryptoMarketRequest {
        let rtn: ICryptoMarketRequest = {
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
