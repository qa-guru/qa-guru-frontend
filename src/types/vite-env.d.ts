/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URI: string;
  readonly VITE_LOGIN_URI: string;
  readonly VITE_LOGOUT_URI: string;
  readonly VITE_AVATAR_UPLOAD_URI: string;
  readonly VITE_AVATAR_DELETE_URI: string;
  readonly VITE_TRAINING_UPLOAD_URI: string;
  readonly VITE_TRAINING_DELETE_URI: string;
  readonly VITE_REFRESH_TOKEN: string;
  readonly VITE_HOMEWORK_FILE_UPLOAD_URI: string;
  readonly VITE_HOMEWORK_FILE_GET_URI: string;
  readonly VITE_HOMEWORK_FILE_DELETE_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
