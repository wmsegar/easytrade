import superagent from "superagent"
import { FeatureFlag } from "./featureFlag.types"
import { FeatureFlagServiceUrls } from "../../urls/urls"
import { logger } from "../../logger"

export class FeatureFlagClient {
    private featureFlagServiceUrl: URL

    constructor() {
        this.featureFlagServiceUrl = FeatureFlagServiceUrls.getFlagsUrl()
    }

    async getFlag(flagId: string): Promise<FeatureFlag | undefined> {
        try {
            const requestURL =
                this.featureFlagServiceUrl.toString() + "/" + flagId
            logger.info(`Sending request to [${requestURL}]`)
            const res = await superagent.get(requestURL)
            return res.body
        } catch (err) {
            logger.warn(`Error when getting feature flag [${err}]`)
            return
        }
    }
}
