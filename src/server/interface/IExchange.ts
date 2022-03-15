import { ITicker } from './ITicker'

export interface IExchange {
    name: string,
    service_name: string,
    ticker?: ITicker
}