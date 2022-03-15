import { ITicker } from './ITicker'

export interface IExchange {
    name: string,
    serviceName: string,
    ticker?: ITicker
}