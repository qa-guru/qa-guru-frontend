/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URI: string;
  readonly VITE_LOGIN_URI: string;
  readonly VITE_LOGOUT_URI: string;
  readonly VITE_REQUEST_SAME_ORIGIN: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
