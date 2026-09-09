import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const API_URL = process.env.VITE_APP_ENDPOINT;
  const PROVISIONING_URL =
    process.env.VITE_PROVISIONING_ENDPOINT || "http://127.0.0.1:8088";
  const BFF_URL = process.env.VITE_BFF_ENDPOINT || "http://127.0.0.1:3042";

  const proxyConfig = {
    "^/provisioning": {
      target: PROVISIONING_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/provisioning/, ""),
    },
    // SPA `/authorization` is LoginPage; BFF lives under `/auth/session`.
    "^/auth/": { target: BFF_URL, changeOrigin: true },
    "^/oauth2": { target: BFF_URL, changeOrigin: true },
    "^/graphql": API_URL,
    "^/login": { target: BFF_URL, changeOrigin: true },
    "^/logout": { target: BFF_URL, changeOrigin: true },
    "^/upload/avatar": API_URL,
    "^/upload/training/.*": API_URL,
    "^/lecture/.*": API_URL,
    "^/student/homework/.*": API_URL,
    "^/lecture/.*/homework/.*": API_URL,
    "^/homework/comment/.*": API_URL,
  };

  return defineConfig({
    server: {
      proxy: proxyConfig,
      host: true,
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths({ root: process.cwd(), ignoreConfigErrors: true }),
    ],
  });
};
