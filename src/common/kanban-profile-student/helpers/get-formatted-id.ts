import { Maybe, TechStack } from "api/graphql/generated/graphql";

export const getFormattedId = (techStack?: TechStack, id?: Maybe<string>) => {
  const lastTwoChars = id?.slice(-2).toUpperCase();
  return `${techStack}-${lastTwoChars}`;
};
