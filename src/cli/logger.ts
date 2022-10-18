import pino from 'pino'
import { cliName } from './constants.js'

export const logger = pino({
  name: cliName,
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})
