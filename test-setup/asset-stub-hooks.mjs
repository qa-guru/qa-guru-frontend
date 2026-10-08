const ASSET_RE =
  /\.(css|scss|sass|less|svg|png|jpe?g|gif|webp|woff2?|ttf|eot|mp4|webm)(\?.*)?$/;
const STUB_URL = "stub-asset://module";

export async function resolve(specifier, context, nextResolve) {
  if (ASSET_RE.test(specifier)) {
    return { url: STUB_URL, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url === STUB_URL) {
    return {
      format: "module",
      source:
        "const Stub = () => null;\n" +
        "export const ReactComponent = Stub;\n" +
        "export default Stub;\n",
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}
