import app from './config/server'
import Logger from './middleware/winston-middleware'
import { Observable } from 'rxjs'
import { arbitrationController } from './controller/controller-module'
import path  from 'path'
import { env } from './environment/env'
import mongoose from 'mongoose'
import { from } from 'rxjs'

const port = app.get('port')
app.listen(port, () => {
    Logger.debug(`Server is up and running @ ${env().domain}:${port}`)
})

// Database connection
const mongooseObservable = from(mongoose.connect(env().db.uri, {}))
mongooseObservable.subscribe({
    next: (result) => {
        Logger.debug('Db connected')
    },
    error: (err) => {
        Logger.error(JSON.stringify(err))
    }
})

// observable ticker
const miliseconds = 60000
const tickerObservable = new Observable(function subscribe(subscriber) {
    const id = setInterval(() => {
      subscriber.next()
    }, miliseconds)
})

// subscriber
tickerObservable.subscribe(() => {
    try {
        arbitrationController.handleArbitration()
    } catch (error) {
        Logger.error(`Bot Err: ${JSON.stringify(error)}`)
    }
})

// serve client
app.get('/', (req, res) => {
    res.sendFile(path.resolve('src/client/index.html'));
});
  