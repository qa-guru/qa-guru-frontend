import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const API_URL = process.env.VITE_APP_ENDPOINT;

  const proxyConfig = {
    "^/graphql": API_URL,
    "^/login": API_URL,
    "^/logout": API_URL,
    "^/refreshtoken": API_URL,
    "^/upload/avatar": API_URL,
    "^/upload/training/.*": API_URL,
    "^/homework/student/homework/.*": API_URL,
    "^/lecture/.*": API_URL,
    "^/lecture/homework/.*": API_URL,
  };

  return defineConfig({
    server: {
      proxy: proxyConfig,
      host: true,
    },
    plugins: [react(), svgr(), tsconfigPaths()],
  });
};
