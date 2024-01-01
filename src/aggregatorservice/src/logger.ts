import { createLogger, transports, format, Logger } from "winston"
const { combine, timestamp, printf, errors } = format

const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss"
const DEFAULT_LOGGING_LEVEL = "debug"

const myFormat = printf(function ({ level, message, timestamp, stack }) {
    return `[${timestamp}] [${level.toUpperCase()}]: ${stack ?? message}`
})
const checkKeysFormat = printf(function (info) {
    let res = ""
    for (const [key, value] of Object.entries(info)) {
        res += `[${key}: ${value}]; `
    }
    return res
})

const logger = createLogger({
    level: DEFAULT_LOGGING_LEVEL,
    format: errors({ stack: true }),
    transports: [
        new transports.Console({
            format: combine(timestamp({ format: TIMESTAMP_FORMAT }), myFormat),
        }),
    ],
})

function addMetadata(logger: Logger, metadata: Record<string, any>) {
    logger.defaultMeta = { ...logger.defaultMeta, ...metadata }
}

export { logger, addMetadata }