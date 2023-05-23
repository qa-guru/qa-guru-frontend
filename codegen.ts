import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: `${process.env.APP_ENDPOINT}${process.env.GRAPHQL_URI}`,
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
