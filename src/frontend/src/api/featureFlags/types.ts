export type FeatureFlag = {
    id: string
    name: string
    description: string
    enabled: boolean
}

export type HandlerResponse = {
    error?: string
}

export type ConfigFlag = {
    name: string
    enabled: boolean
}

export type Config = {
    featureFlagManagement: boolean
}

export const ConfigFlagNames = {
    FEATURE_FLAG_MANAGEMENT: "frontend_feature_flag_management",
}

export const ConfigDefaults: Config = { featureFlagManagement: true }
