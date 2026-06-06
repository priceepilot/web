const path = require("node:path");
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

const githubRepoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.GITHUB_ACTIONS && githubRepoName ? `/${githubRepoName}/` : "/";

module.exports = defineConfig({
  base,
  cacheDir: path.resolve(__dirname, ".vite-cache"),
  publicDir: "public",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5174,
    strictPort: true,
    host: true,
  },
  preview: {
    host: true,
  },
});
