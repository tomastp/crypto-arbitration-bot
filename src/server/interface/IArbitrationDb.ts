
import { Document, Model } from 'mongoose'

export interface IArbitrationDb {
    exchangeSelling: string
    exchangeBuying: string
    arbitrationPercent: number
    sellingPrice: number
    buyingPrice: number
}

export interface IArbitrationDbDocument extends IArbitrationDb, Document {}
export interface IArbitrationDbModel extends Model<IArbitrationDbDocument> {}
