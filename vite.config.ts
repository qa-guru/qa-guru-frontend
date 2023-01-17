import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const url = "http://5.161.103.109:8080";

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  server: {
    proxy: {
      "^/(graphql|login|logout)": url,
    },
    host: true,
  },
  plugins: [react(), svgr()],
});
