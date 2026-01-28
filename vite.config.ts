import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  root: "./src",
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [vue(), tsconfigPaths()],
}));
