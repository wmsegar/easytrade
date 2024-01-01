import { Application, NextFunction, Request, Response } from "express"
import { IPlugin, RequestCallback } from "./plugins.types"
import { ErgoAggregatorSlowdownPlugin } from "./plugins/ergoAggregatorSlowdown.plugin"
import { ERGO_AGGREGATOR_SLOWDOWN_CONST } from "./plugin.const"
import { PluginProvider } from "./OpenFeature/pluginProvider"
import { logger } from "../logger"
import { OFFERS_ENDPOINTS } from "../routes/routes.const"
import { OpenFeature, Client } from "@openfeature/js-sdk"
import platforms from "../../resources/platforms.json"
import _ from "lodash"

const pluginList: { route: string; plugin: IPlugin }[] = [
    {
        route: OFFERS_ENDPOINTS.GET_OFFERS,
        plugin: new ErgoAggregatorSlowdownPlugin(
            ERGO_AGGREGATOR_SLOWDOWN_CONST.AFFECTED_PLATFROM_DELAY_MS,
            _.sampleSize(
                platforms,
                ERGO_AGGREGATOR_SLOWDOWN_CONST.AFFECTED_PLATFORM_COUNT
            )
        ),
    },
]

export function setupPlugins(app: Application) {
    addOpenFeature(app)

    pluginList.forEach(({ route, plugin }) => {
        logger.info(
            `Registering plugin [${plugin.getName()}] to route [${route}]`
        )
        app.use(route, getPluginRunner(plugin))
    })
}

function addOpenFeature(app: Application): void {
    OpenFeature.setProvider(new PluginProvider())
    const client = OpenFeature.getClient("offerservice")

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.locals.openFeatureClient = client
        next()
    })
}

function getPluginRunner(plugin: IPlugin): RequestCallback {
    return async (req: Request, res: Response, next: NextFunction) => {
        const openFeatureClient: Client = res.locals.openFeatureClient
        const pluginState = await openFeatureClient.getBooleanValue(
            plugin.getName(),
            false
        )

        if (pluginState) {
            logger.info(`Plugin [${plugin.getName()}] enabled, running...`)
            await plugin.run(req, res)
        } else {
            logger.info(`Plugin [${plugin.getName()}] disabled, skipping...`)
        }
        next()
    }
}
