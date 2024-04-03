import { Maybe } from "api/graphql/generated/graphql";

export const getFormattedId = (id?: Maybe<string>) => {
  const lastTwoChars = id?.slice(-2).toUpperCase();
  return `JAVA-${lastTwoChars}`;
};
