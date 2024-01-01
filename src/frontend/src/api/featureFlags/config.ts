import { backends } from "../backend"
import { ConfigFlag, Config, ConfigFlagNames, ConfigDefaults } from "./types"

async function getRawConfigFlags(): Promise<ConfigFlag[]> {
    console.log(`getting config flags from API`)
    try {
        const { data } = await backends.config.getAll()
        console.log(data)
        return data.results.map(({ name, enabled }) => ({ name, enabled }))
    } catch (error) {
        console.error("error: ", error)
        return []
    }
}

function getFlag(
    flags: ConfigFlag[],
    name: string,
    defaultValue: boolean
): boolean {
    return flags.find((flag) => flag.name === name)?.enabled ?? defaultValue
}

export async function getConfig(): Promise<Config> {
    const flags = await getRawConfigFlags()
    return {
        featureFlagManagement: getFlag(
            flags,
            ConfigFlagNames.FEATURE_FLAG_MANAGEMENT,
            ConfigDefaults.featureFlagManagement
        ),
    }
}
