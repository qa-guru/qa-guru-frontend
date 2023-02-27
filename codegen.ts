import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://app-stage.qa.guru:8080/graphql",
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
