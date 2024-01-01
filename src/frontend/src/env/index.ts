// the calls to import.meta.env.* are replaced during build
// so they can't be accessed dynamically
// like import.meta.env[name]

export class EnvProxy {
    static getFeatureFlagServiceUrl(): string {
        const origin =
            import.meta.env.VITE_FEATURE_FLAG_SERVICE_URL ??
            `${window.location.protocol}\\\\${window.location.hostname}`
        const proxyPath = import.meta.env.VITE_FEATURE_FLAG_SERVICE_PROXY_PATH
        return `${origin}${proxyPath}`
    }

    static getAccountServiceUrl(): string {
        const origin =
            import.meta.env.VITE_ACCOUNT_SERVICE_URL ?? window.location.origin
        const proxyPath = import.meta.env.VITE_ACCOUNT_SERVICE_PROXY_PATH
        return `${origin}${proxyPath}`
    }

    static getLoginServiceUrl(): string {
        const origin =
            import.meta.env.VITE_LOGIN_SERVICE_URL ?? window.location.origin
        const proxyPath = import.meta.env.VITE_LOGIN_SERVICE_PROXY_PATH
        return `${origin}${proxyPath}`
    }

    static getBrokerServiceUrl(): string {
        const origin =
            import.meta.env.VITE_BROKER_SERVICE_URL ?? window.location.origin
        const proxyPath = import.meta.env.VITE_BROKER_SERVICE_PROXY_PATH
        return `${origin}${proxyPath}`
    }

    static getPricingServiceUrl(): string {
        const origin =
            import.meta.env.VITE_PRICING_SERVICE_URL ?? window.location.origin
        const proxyPath = import.meta.env.VITE_PRICING_SERVICE_PROXY_PATH
        return `${origin}${proxyPath}`
    }

    static getCreditCardServiceUrl(): string {
        const origin =
            import.meta.env.VITE_CREDIT_CARD_SERVICE_URL ??
            window.location.origin
        const proxyPath = import.meta.env.VITE_CREDIT_CARD_SERVICE_PROXY_PATH
        return `${origin}${proxyPath}`
    }
}
