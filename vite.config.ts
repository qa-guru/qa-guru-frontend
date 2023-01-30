import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      proxy: {
        "^/(graphql|login|logout)": process.env.VITE_APP_ENDPOINT!,
      },
      host: true,
    },
    plugins: [react(), svgr()],
    // @ts-ignore
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests.ts",
    },
  });
};
