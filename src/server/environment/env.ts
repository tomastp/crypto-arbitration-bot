import { exit } from 'process'
import { IEnv } from '../interface/IEnv'
export { IEnv } from '../interface/IEnv'
import Logger from '../middleware/winston-middleware'

export const env: () => IEnv = () => {  
  if (process.env.ENVIRONMENT === 'dev') {
    let env = require('./dev')
    return env.ENV
  } else if (process.env.ENVIRONMENT === 'production') {
    let env = require('./prod')
    return env.ENV
  } else {
    Logger.debug(`Error. shell variable ENVIRONMENT not set. Acceptable values are 'dev' | 'production'`)
    exit(1)
  }
};
