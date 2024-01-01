import { runEngine } from "./controllers/engine"
import { logger } from "./logger"
import * as dotenv from 'dotenv'
import { LIGHT_PACKAGE_PROBABILITY, Package, PLATFORM_ENV_NAME, PRO_PACKAGE_PROBABILITY, STARTER_PACKAGE_PROBABILITY } from "./const"
import { getEnv } from "./util"

if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}
const packageDistribution = [
    { value: Package.Starter, probability: Number(getEnv(STARTER_PACKAGE_PROBABILITY)) },
    { value: Package.Light, probability: Number(getEnv(LIGHT_PACKAGE_PROBABILITY)) },
    { value: Package.Pro, probability: Number(getEnv(PRO_PACKAGE_PROBABILITY)) }
]
const platform = getEnv(PLATFORM_ENV_NAME)
logger.info(`Starting platform [${platform}]`)
logger.info(`Using package distribution [${JSON.stringify(packageDistribution)}]`)
logger.info("Starting aggregator service application")
runEngine(platform, packageDistribution)
