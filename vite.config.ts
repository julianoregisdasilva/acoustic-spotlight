import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  build: {
      // Option 1: Relative path string (relative to project root)
      outDir: "dist", 
      // Optional: Forces Vite to empty the folder before building
      emptyOutDir: true, 
  },  
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
