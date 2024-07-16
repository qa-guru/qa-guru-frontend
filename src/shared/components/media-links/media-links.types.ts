import { Maybe, UserDto } from "api/graphql/generated/graphql";

export interface IconLinkProps {
  href?: string | null;
  icon: React.ElementType;
  iconSecondary: React.ElementType;
}

export interface IMediaLinks {
  user?: Maybe<UserDto>;
}
