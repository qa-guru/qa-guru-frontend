import { Maybe, TechStack } from "api/graphql/generated/graphql";

export const formatId = (techStack?: TechStack, id?: Maybe<string>) => {
  const lastTwoChars = id?.slice(-2).toUpperCase();
  return `${techStack}-${lastTwoChars}`;
};
