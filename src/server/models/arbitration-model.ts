import { model } from 'mongoose'
import { IArbitrationDbDocument } from '../interface/IArbitrationDb'
import arbitrationSchema from '../schema/arbitration'
export const arbitrationDbModel = model<IArbitrationDbDocument>('arbitration', arbitrationSchema)
