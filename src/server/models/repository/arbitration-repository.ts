import { IArbitration } from '../../interface/'
import { arbitrationDbModel } from '../../models/arbitration-model'
import Logger from '../../middleware/winston-middleware'
import { from } from 'rxjs'

export class ArbitrationRepository {

    create(arbitration: IArbitration): void{
        const observable = from(arbitrationDbModel.create({
            exchangeSelling: arbitration.exchangeSelling.name, 
            exchangeBuying: arbitration.exchangeBuying.name,
            arbitrationPercent: arbitration.arbitrationPercent,
            sellingPrice: arbitration.exchangeSelling.ticker?.ask,
            buyingPrice: arbitration.exchangeBuying.ticker?.bid
        }))
        observable.subscribe({
            next: (results) => {
                Logger.info(`Arbitration document saved: ${results._id}`)
            },
            error: (err) => {
                Logger.error(`Failed to save document ${JSON.stringify(err)}`)
            }
        })
    }
}
