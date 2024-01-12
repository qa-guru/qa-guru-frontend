import {
  Maybe,
  RatingUserDto,
  UserDto,
} from "../../../../api/graphql/generated/graphql";

export interface IUserRating {
  user?: Maybe<UserDto>;
  rating?: Maybe<RatingUserDto>;
}
