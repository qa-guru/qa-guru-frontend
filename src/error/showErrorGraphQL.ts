import { ApolloError } from "@apollo/client";
import { notification } from "antd";

const showErrorGraphQL = (error: ApolloError) => {
  return error.graphQLErrors.map(({ message }) =>
    notification.error({ message })
  );
};

export default showErrorGraphQL;
