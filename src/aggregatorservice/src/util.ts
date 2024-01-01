export function sleep(ms: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getEnv(name: string): string {
    const val = process.env[name]
    if (val === undefined) {
        throw new Error(`Value for env var [${name}] is missing`)
    }
    return val
}