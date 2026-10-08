import { register, createRequire } from "node:module";

register("./asset-stub-hooks.mjs", import.meta.url);

const require = createRequire(import.meta.url);
const Module = require("node:module");

const stubComponent = () => null;
const stubModule = (module) => {
  module.exports = { ReactComponent: stubComponent, default: stubComponent };
};

for (const ext of [
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".mp4",
  ".webm",
]) {
  Module._extensions[ext] = stubModule;
}
