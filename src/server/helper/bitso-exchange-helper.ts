import { env } from '../environment/env'
import { IBitsoBodyRequestTransaction } from '../interface/IBitsoBodyRequestTransaction'

export class BitsoExchangeHelper {

    static book: string = 'btc_ars'
    static exchangeName: string = 'Bitso'

    /**
     * Set the request parameters to send in the post request
     * to sell crypto
     * @param major number
     * @param origin_id number
     * @returns IBitsoBodyRequestTransaction
     */
    setRequestSellCrypto(major: number, origin_id: number): IBitsoBodyRequestTransaction {
        let rtn: IBitsoBodyRequestTransaction = {
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
     * @returns IBitsoBodyRequestTransaction
     */
    setRequestBuyCrypto(major: number, origin_id: number): IBitsoBodyRequestTransaction {
        let rtn: IBitsoBodyRequestTransaction = {
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
                origin_id: origin_id
            }
        }
        return rtn
    }

}