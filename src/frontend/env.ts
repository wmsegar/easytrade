import { defineConfig, Schema } from "@julr/vite-plugin-validate-env"

function proxyPath(key: string, value?: string): string {
    if (!value) {
        throw new Error(`Value is required`)
    }
    if (!value.startsWith("/")) {
        throw new Error(`Value must start with "/", but was [${value}]`)
    }
    return value
}

const url = Schema.string.optional({ format: "url" })

export default defineConfig({
    VITE_BASE_URL: Schema.string.optional(),
    VITE_FEATURE_FLAG_SERVICE_URL: url,
    VITE_FEATURE_FLAG_SERVICE_PROXY_PATH: proxyPath,
    VITE_ACCOUNT_SERVICE_URL: url,
    VITE_ACCOUNT_SERVICE_PROXY_PATH: proxyPath,
    VITE_LOGIN_SERVICE_URL: url,
    VITE_LOGIN_SERVICE_PROXY_PATH: proxyPath,
    VITE_BROKER_SERVICE_URL: url,
    VITE_BROKER_SERVICE_PROXY_PATH: proxyPath,
    VITE_PRICING_SERVICE_URL: url,
    VITE_PRICING_SERVICE_PROXY_PATH: proxyPath,
    VITE_CREDIT_CARD_SERVICE_URL: url,
    VITE_CREDIT_CARD_SERVICE_PROXY_PATH: proxyPath,
})
