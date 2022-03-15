import morgan, { StreamOptions } from 'morgan'
import Logger from './winston-middleware'

const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message),
};

// Skip all the Morgan http log if the 
// application is not running in development mode.
const skip = () => {
  const env = process.env.ENVIRONMENT || 'dev'
  return env !== 'dev'
}

// Build the morgan middleware
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

export default morganMiddleware