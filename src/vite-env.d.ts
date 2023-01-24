/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URI: string;
  readonly VITE_LOGIN_URI: string;
  readonly VITE_LOGOUT_URI: string;
  readonly VITE_REQUEST_SAME_ORIGIN: boolean;
  readonly VITE_APP_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
