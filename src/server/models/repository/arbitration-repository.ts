import { IArbitration } from '../../interface/'
import { arbitrationDbModel } from '../../models/arbitration-model'
import Logger from '../../middleware/winston-middleware'
import { from } from 'rxjs'

export class ArbitrationRepository {

    create(arbitration: IArbitration): void{
        const observable = from(arbitrationDbModel.create({
            exchangeSelling: arbitration.exchange_selling.name, 
            exchangeBuying: arbitration.exchange_buying.name,
            arbitrationPercent: arbitration.arbitration_percent,
            sellingPrice: arbitration.exchange_selling.ticker?.ask,
            buyingPrice: arbitration.exchange_buying.ticker?.bid
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
