import { FC } from "react";

import { StyledRatingChip } from "./user-rating.styled";
import { IUserRating } from "./user-rating.types";

const UserRating: FC<IUserRating> = ({ rating, user }) => {
  return (
    <StyledRatingChip
      size="small"
      variant="outlined"
      label={rating ? rating?.rating : user?.rating?.rating}
    />
  );
};

export default UserRating;
