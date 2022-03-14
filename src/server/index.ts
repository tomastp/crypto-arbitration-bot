import app from './config/server'
import Logger from './middleware/winston-middleware'
import { Observable } from 'rxjs'

const port = app.get('port')
app.listen(port, () => {
    Logger.debug(`Server is up and running @ http://localhost:${port}`)
})
