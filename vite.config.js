import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    strictPort: true, // Fail if port occupied instead of auto-fallback
    open: false, // Don't auto-open browser (prevents issues with background processes)
    host: '0.0.0.0', // Allow connections from localhost and 127.0.0.1
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
