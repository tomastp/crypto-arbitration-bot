import { Schema } from 'mongoose'

const arbitrationSchema = new Schema({
    exchangeSelling: {
        type: String,
        required: true
    },
    exchangeBuying: {
        type: String,
        required: true
    },
    arbitrationPercent: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    buyingPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default arbitrationSchema
