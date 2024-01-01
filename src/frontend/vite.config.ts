/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react-swc"
import { defineConfig, loadEnv } from "vite"
import { ValidateEnv } from "@julr/vite-plugin-validate-env"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    console.log(`VITE getting config for [${mode}]`)
    const env = loadEnv(mode, process.cwd())
    process.env = { ...process.env, ...env }
    console.log(`Base url [${process.env.VITE_BASE_URL}]`)
    return {
        plugins: [react(), ValidateEnv()],
        base: process.env.VITE_BASE_URL,
        server: {
            port: 3000,
        },
    }
})
