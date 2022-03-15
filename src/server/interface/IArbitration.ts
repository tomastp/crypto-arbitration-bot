import { IExchange } from './IExchange'

export interface IArbitration {
    exchange: IExchange
    exchange_direction: string
    arbitration_percent: number
}
