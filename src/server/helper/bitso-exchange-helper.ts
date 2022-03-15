import { env } from '../environment/env'
import { IBitsoRequest } from '../interface/IBitsoRequest'

export class BitsoExchangeHelper {

    static book: string = 'btc_ars'
    static exchangeName: string = 'Bitso'

    /**
     * Set the request parameters to send in the post request
     * to sell crypto
     * @param major number
     * @param originId number
     * @returns IBitsoRequest
     */
    setRequestSellCrypto(major: number, originId: number): IBitsoRequest {
        let rtn: IBitsoRequest = {
            headers: {
                key: env().appKeyBitso!,
                signature: env().appSignatureBitso!,
                nonce: env().appSignatureBitso!,
            },
            body: {
                book: BitsoExchangeHelper.book,
                side: 'sell',
                type: 'merket',
                major: major,
                originId: originId
            }
        }
        return rtn
    }

    /**
     * Set the request parameters to send in the post request
     * to buy crypto
     * @param major number
     * @param originId number
     * @returns IBitsoRequest
     */
    setRequestBuyCrypto(major: number, originId: number): IBitsoRequest {
        let rtn: IBitsoRequest = {
            headers: {
                key: env().appKeyBitso!,
                signature: env().appSignatureBitso!,
                nonce: env().appSignatureBitso!,
            },
            body: {
                book: BitsoExchangeHelper.book,
                side: 'buy',
                type: 'merket',
                major: major,
                originId: originId
            }
        }
        return rtn
    }

}
