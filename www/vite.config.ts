import { preact } from "@preact/preset-vite"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [preact(), tsConfigPaths()],
  build: {
    target: "esnext",
    rollupOptions: {
      shimMissingExports: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: { target: "es2022" },
  },
  define: {
    // TODO remove once closed https://github.com/paritytech/capi/issues/1038
    // temporary capi workaround
    "process.env.CAPI_SERVER": process.env.CAPI_SERVER, // "http://localhost:4646/",
    "process.env.CAPI_TARGET": process.env.CAPI_TARGET,
  },
})
