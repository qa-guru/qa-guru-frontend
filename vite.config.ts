import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      proxy: {
        "^/(graphql|login|logout|/api/v1/avatar/upload|/api/v1/avatar)":
          process.env.VITE_APP_ENDPOINT!,
      },
      host: true,
    },
    plugins: [react(), svgr(), tsconfigPaths()],
    // @ts-ignore
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/test/setup-test.ts",
    },
  });
};
