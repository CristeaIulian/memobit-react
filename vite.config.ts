import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@memobit": path.resolve(__dirname, "./projects/memobit/src/"),
      "@memobit-styles": path.resolve(
        __dirname,
        "./projects/memobit/src/styles",
      ),
    },
  },
});
