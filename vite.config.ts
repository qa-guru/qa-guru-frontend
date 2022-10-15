import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginFonts } from "vite-plugin-fonts";
const url = "http://5.161.103.109:8080";

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  server: {
    proxy: {
      "^/(graphql|login|logout)": url,
    },
    host: true,
  },
  plugins: [
    react(),
    VitePluginFonts({
      google: {
        families: ["Sora"],
      },
    }),
  ],
  define: {
    // global: {},
    "process.env": {},
  },
});
