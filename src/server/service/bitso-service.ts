import { Observable } from 'rxjs'
import Axios from  'axios-observable'
import { IBitsoBodyRequestTransaction } from '../interface'

export class BitsoService {
    
    private endPoint: string

    constructor() {
        this.endPoint = 'http://api.bitso.com/v3'
    }

    /**
     * Get ticker data from Bitso Exchange
     * @param book 
     * @returns Observable
     */
    getTicker(book:string): Observable<any> {
        return Axios.get(`${this.endPoint}/ticker`, {
            params: {
              book: book
            }
          })
    }

    /**
     * Post new order to sell or buy
     * @param params IBitsoBodyRequestTransaction
     * @returns Observable
     */
    postTransaction(params: IBitsoBodyRequestTransaction): Observable<any> {
        return Axios.post('/orders', {
            headers: {
                key: params.headers.key,
                signature: params.headers.signature,
                nonce: params.headers.nonce,
            },
            body: {
                book: params.body.book,
                side: params.body.side,
                type: params.body.type,
                major: params.body.major,
                origin_id: params.body.origin_id
            }
        })
    }

}
