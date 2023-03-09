import { defineConfig } from "vite";
import { preact } from "@preact/preset-vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [preact(), tsConfigPaths()],
  build: { target: "esnext" },
  optimizeDeps: {
    esbuildOptions: { target: "es2022" },
  },
});
