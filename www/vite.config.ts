import { preact } from "@preact/preset-vite"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [preact(), tsConfigPaths()],
  build: {
    target: "esnext",
    rollupOptions: {
      external: ["node:fs/promises", "node:stream"],
    },
  },
  optimizeDeps: {
    esbuildOptions: { target: "es2022" },
  },
  define: {
    "process.env.CAPI_SERVER": process.env.CAPI_SERVER,
    "process.env.CAPI_TARGET": process.env.CAPI_TARGET,
  },
})
