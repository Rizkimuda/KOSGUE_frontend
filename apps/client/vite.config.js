import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "public",
  envDir: "../",
  resolve: {
    alias: {
      "/src": path.resolve(process.cwd(), "src"),
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
