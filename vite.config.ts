import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const url = "https://app.qa.guru/api/graphql";

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
