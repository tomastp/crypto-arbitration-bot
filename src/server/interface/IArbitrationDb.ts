
import { Document, Model } from 'mongoose'

export interface IArbitrationDb {
    arbitration_percent: number
    exchangeSelling: string
    exchangeBuying: string
    arbitrationPercent: number
    sellingPrice: number
    buyingPrice: number
}

export interface IArbitrationDbDocument extends IArbitrationDb, Document {}
export interface IArbitrationDbModel extends Model<IArbitrationDbDocument> {}
