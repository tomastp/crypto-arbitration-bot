import { IBitsoBodyRequestTransaction } from './IBitsoBodyRequestTransaction'
import { ICryptoMarketBodyRequestTransaction } from './ICryptoMarketBodyRequestTransaction'

export interface IMultipleTransactions {
    bitsoParamsRequest: IBitsoBodyRequestTransaction
    cryptoMarketParamsRequest: ICryptoMarketBodyRequestTransaction
}