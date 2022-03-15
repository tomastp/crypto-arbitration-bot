import { IExchange } from './IExchange'

export interface IArbitration {
    exchange_selling: IExchange
    exchange_buying: IExchange
    exchange_direction: string
    arbitration_percent: number
}
