import { CONSECUTIVE_FAIL_COUNTER_LIMIT, FILTER_ENV_NAME, LONG_DELAY_MS, MAXFEE_ENV_NAME, Package, PLATFORM_ENV_NAME, REQUEST_TIME_LIMIT_MS, SIGNUP_COUNTER_LIMIT, STANDARD_DELAY_MS } from "../const"
import { logger } from "../logger"
import { ProbabilityDistribution } from "../randomGenerator/randomGenerator.types"
import { getEnv, sleep } from "../util"
import { offer, signup } from "./services"

export async function runEngine(platform: string, packageDistribution: ProbabilityDistribution<Package>[]) {
  let consecutiveFailCounter = 0
  let signupCounter = 0

  logger.info("Starting 'endless' loop.")
  while (true) {
    logger.info("Setting starting time")
    const startTime = Date.now()

    logger.info("Sending offer request and awaiting response")
    await offer(
      platform,
      process.env[FILTER_ENV_NAME],
      process.env[MAXFEE_ENV_NAME]
    )

    const endTime = Date.now()
    const requestDuration = endTime - startTime

    //if an offer response takes longer then 1 second, then increase the consecutive fail counter
    consecutiveFailCounter = requestDuration >= REQUEST_TIME_LIMIT_MS ? consecutiveFailCounter + 1 : 0
    logger.info(`Response time [${requestDuration}ms] ${requestDuration >= REQUEST_TIME_LIMIT_MS ? "over" : "within"} limit [${REQUEST_TIME_LIMIT_MS}ms], setting fail counter to [${consecutiveFailCounter}]`)

    //if we fail for 50 times consecutively then we wait for 15 minutes
    //if after the 15 min long wait we get another slow response, wait for another 15 min and repeat this step
    if (consecutiveFailCounter >= CONSECUTIVE_FAIL_COUNTER_LIMIT) {
      logger.info(`Fail counter exceeding limit [${CONSECUTIVE_FAIL_COUNTER_LIMIT}], doing long sleep [${LONG_DELAY_MS / 1000}s]`)
      await sleep(LONG_DELAY_MS)
    } else {
      signupCounter++
      logger.info(`Fail counter [${consecutiveFailCounter}] within limit [${CONSECUTIVE_FAIL_COUNTER_LIMIT}], doing standard sleep [${STANDARD_DELAY_MS / 1000}s]`)
      await sleep(STANDARD_DELAY_MS - requestDuration)
    }

    logger.info(`Signup counter is [${signupCounter}]`)

    //perform signup once per hour. 3 sec * 20 * 60 = 60 min
    if (signupCounter == SIGNUP_COUNTER_LIMIT) {
      logger.info(`Signup counter reached the limit [${SIGNUP_COUNTER_LIMIT}], resetting the counter and registering new user`)
      signupCounter = 0
      await signup(platform, packageDistribution)
    }

    logger.info("Current iteration finished")
  }
}
