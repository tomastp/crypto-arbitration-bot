import winston from 'winston'

type lavelError = {
  error: number,
  warn: number,
  info: number,
  http: number,
  debug: number,
}

type colorText = {
  error: string,
  warn: string,
  info: string,
  http: string,
  debug: string,
}

const levels: lavelError = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = (): string => {
  const env = process.env.ENVIRONMENT || 'dev'
  const isDevelopment = env === 'dev'
  return isDevelopment ? 'debug' : 'warn'
}

const colors: colorText = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default Logger