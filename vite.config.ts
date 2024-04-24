import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const proxyConfig = {
    "^/graphql": process.env.VITE_APP_ENDPOINT,
    "^/login": process.env.VITE_APP_ENDPOINT,
    "^/logout": process.env.VITE_APP_ENDPOINT,
    "^/api/v1/upload/avatar": process.env.VITE_APP_ENDPOINT,
    "^/api/v1/upload/training/:id": process.env.VITE_APP_ENDPOINT,
  };

  return defineConfig({
    server: {
      proxy: proxyConfig,
      host: true,
    },
    plugins: [react(), svgr(), tsconfigPaths()],
  });
};
