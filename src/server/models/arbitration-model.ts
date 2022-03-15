import { model } from 'mongoose'
import { IArbitrationDbDocument } from '../interface/IArbitrationDb'
import arbitrationSchema from '../schema/arbitration.schema'
export const arbitrationDbModel = model<IArbitrationDbDocument>('arbitration', arbitrationSchema)
