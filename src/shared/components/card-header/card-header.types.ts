import { Maybe, TechStack } from "api/graphql/generated/graphql";

export interface ICardHeader {
  cardId?: Maybe<string>;
  creationDate: string | null;
  techStack?: TechStack;
  isActive?: boolean;
  route: string;
}
