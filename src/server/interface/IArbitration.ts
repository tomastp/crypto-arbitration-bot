import { IExchange } from './IExchange'

export interface IArbitration {
    exchangeSelling: IExchange
    exchangeBuying: IExchange
    exchangeDirection: string
    arbitrationPercent: number
}