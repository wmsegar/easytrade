import { get, post } from "superagent"
import { createHash } from "crypto"
import { logger } from "../logger"
import { CustomDistributionRandomGenerator } from "../randomGenerator/randomGenerator"
import { Package } from "../const"
import { ProbabilityDistribution } from "../randomGenerator/randomGenerator.types"
import { UserSignupRequestBody } from "../types"

function getPackage(packageDistribution: ProbabilityDistribution<Package>[]): Package {
    return CustomDistributionRandomGenerator.getRandomValue(packageDistribution)
}

function getUserBody(platform: string, packageDistribution: ProbabilityDistribution<Package>[]): UserSignupRequestBody {
    return {
        PackageId: getPackage(packageDistribution).valueOf(),
        FirstName: `Jack ${platform}`,
        LastName: `Ohara ${platform}`,
        Username: `${platform + Date.now()}`,
        Email: `${platform + Date.now()}@ohara.com`,
        Address: `${platform + Date.now()} Chicago USA`,
        HashedPassword: createHash("sha256")
            .update(platform + Date.now())
            .digest("hex"),
        Origin: `${platform}`
    }
}

export async function offer(
    platform: string,
    productFilter?: string,
    maxYearlyFeeFilter?: string,
    xmlRequestProbability: number = 0.5
) {
    try {
        const useXml = Math.random() < xmlRequestProbability
        const url = `http://${process.env.OFFER_SERVICE}/api/offers/${platform}`

        logger.info(`Sending ${useXml ? 'XML' : 'JSON'} offer request to [${url}]`)
        const res = await get(url).set("Accept", useXml ? "application/xml" : "application/json").query({ productFilter, maxYearlyFeeFilter })

        logger.info(`Got offer response [${useXml ? res.body : JSON.stringify(res.body)}]`)
        return res.ok && res.status == 200
    } catch (err) {
        logger.error(`Error when sending offer request [${err}]`)
        return false
    }
}

export async function signup(platform: string, packageDistribution: ProbabilityDistribution<Package>[]) {
    try {
        const url = `http://${process.env.OFFER_SERVICE}/api/signup`
        logger.info(`Sending signup request to [${url}]`)
        const res = await post(url).send(getUserBody(platform, packageDistribution))

        logger.info(`Got signup response [${JSON.stringify(res.body)}]`)
        return res.ok && res.status == 201
    } catch (err) {
        logger.error(`Error when sending signup request [${err}]`)
        return false
    }
}
