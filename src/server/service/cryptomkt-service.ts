import { Observable } from 'rxjs'
import Axios from  'axios-observable'
import { ICryptoMarketRequest } from '../interface'

export class CryptomktService {
    
    private endPoint: string

    constructor() {
        this.endPoint = 'https://api.exchange.cryptomkt.com/api/3/public'
    }

    /**
     * Get ticker data from CryptoMarket Exchange
     * @param book 
     * @returns Observable
     */
    getTicker(symbol:string): Observable<any> {
        return Axios.get(`${this.endPoint}/ticker`, {
            params: {
                symbols: symbol
            }
          })
    }

    /**
     * Post new order to sell or buy
     * @param params ICryptoMarketRequest
     * @returns Observable
     */
    postTransaction(params: ICryptoMarketRequest): Observable<any> {
        return Axios.post('/orders', {
            headers: {
                key: params.headers.key,
                signature: params.headers.signature,
                nonce: params.headers.nonce,
            },
            body: {
                symbol: params.body.symbol,
                side: params.body.side,
                type: params.body.type,
                major: params.body.major,
                originId: params.body.originId
            }
        })
    }
    
}
