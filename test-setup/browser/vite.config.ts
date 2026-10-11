import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import { resolve } from "node:path";

const frontend = resolve(__dirname, "../..");
const source = resolve(frontend, "src");
const modules = [
  "api",
  "assets",
  "cache",
  "config",
  "features",
  "shared",
  "theme",
];

export default defineConfig({
  root: __dirname,
  envDir: false,
  cacheDir: resolve(frontend, "node_modules/.vite/lms-browser"),
  define: {
    "import.meta.env.VITE_GRAPHQL_URI": JSON.stringify("/graphql"),
    "import.meta.env.VITE_HOMEWORK_FILE_UPLOAD_URI": JSON.stringify(
      "/homework/:homeWorkId/file"
    ),
    "import.meta.env.VITE_HOMEWORK_FILE_GET_URI": JSON.stringify(
      "/homework/:homeWorkId/file/:fileId"
    ),
    "import.meta.env.VITE_HOMEWORK_FILE_DELETE_URI": JSON.stringify(
      "/homework/:homeWorkId/file/:fileId"
    ),
    "import.meta.env.VITE_HOMEWORK_COMMENT_FILE_UPLOAD_URI": JSON.stringify(
      "/homework/comment/:commentId/file"
    ),
    "import.meta.env.VITE_HOMEWORK_COMMENT_FILE_GET_URI": JSON.stringify(
      "/homework/comment/:commentId/file/:fileId"
    ),
    "import.meta.env.VITE_HOMEWORK_COMMENT_FILE_DELETE_URI": JSON.stringify(
      "/homework/comment/:commentId/file/:fileId"
    ),
  },
  resolve: {
    alias: modules.map((name) => ({
      find: name,
      replacement: resolve(source, name),
    })),
  },
  plugins: [
    {
      name: "fixture-offline-fonts",
      enforce: "pre",
      load(id) {
        return id === resolve(source, "theme/fonts.css") ? "" : null;
      },
    },
    react(),
    svgr(),
  ],
  server: {
    host: "127.0.0.1",
    hmr: false,
    proxy: {},
    fs: { allow: [frontend] },
  },
});
