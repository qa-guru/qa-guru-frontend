import { FC } from "react";

import { useRatingColor } from "shared/hooks";

import { StyledRatingChip } from "./rating.styled";
import { IUserRating } from "./rating.types";

const Rating: FC<IUserRating> = ({ rating, user }) => {
  const ratingValue = rating ? rating.rating : user?.rating?.rating;
  const chipColor = useRatingColor(ratingValue);

  return ratingValue ? (
    <StyledRatingChip
      size="small"
      variant="outlined"
      label={rating ? rating?.rating : user?.rating?.rating}
      ratingColor={chipColor}
    />
  ) : (
    <></>
  );
};

export default Rating;
