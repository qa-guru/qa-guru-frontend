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
  generates: {
    "src/api/graphql/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withComponent: true,
      },
    },
  },
};

export default config;
