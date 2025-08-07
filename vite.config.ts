import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  logLevel: "info",
  plugins: [react(), tsconfigPaths()],
  build: {
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs to reduce size
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Optimize chunking
          }
        },
      },
    },
  },
});
