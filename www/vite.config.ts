import { preact } from "@preact/preset-vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

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
});
