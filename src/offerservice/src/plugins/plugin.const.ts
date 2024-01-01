import path from "path"

export const PLUGIN_STATES_DIR = "pluginStates"
export const PLUGIN_CONFIG = path.join("resources", "pluginConfig.json")
export const STATE_LOCK_WAIT_TIMEOUT_MS = 1000
export const STATE_LOCK_WAIT_INTERVAL_MS = 100

export class ERGO_AGGREGATOR_SLOWDOWN_CONST {
    public static readonly AFFECTED_PLATFORM_COUNT = 2
    public static readonly AFFECTED_PLATFROM_DELAY_MS = 2000
}
