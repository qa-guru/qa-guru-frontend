import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: [
    "src/api/schema.graphql",
    ...(process.env.CODEGEN_REMOTE_SCHEMA === "1" && process.env.APP_ENDPOINT
      ? [`${process.env.APP_ENDPOINT}${process.env.GRAPHQL_URI || "/graphql"}`]
      : []),
  ],
  documents: ["src/**/*.graphql"],
  config: {
    defaultScalarType: "any",
  },
  generates: {
    "src/api/graphql/generated/types.ts": {
      plugins: ["typescript"],
    },
    "src/api/graphql/generated/graphql.tsx": {
      plugins: [
        { add: { content: "export * from './types';" } },
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        importSchemaTypesFrom: "src/api/graphql/generated/types",
      },
    },
  },
};

export default config;
