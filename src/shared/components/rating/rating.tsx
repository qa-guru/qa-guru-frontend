import { FC } from "react";

import { StyledRatingChip } from "./rating.styled";
import { IUserRating } from "./rating.types";
import useRatingColor from "../../hooks/use-rating-color";

const Rating: FC<IUserRating> = ({ rating, user }) => {
  const ratingValue = rating ? rating.rating : user?.rating?.rating;
  const chipColor = useRatingColor(ratingValue);

  return (
    <StyledRatingChip
      size="small"
      variant="outlined"
      label={rating ? rating?.rating : user?.rating?.rating}
      ratingColor={chipColor}
    />
  );
};

export default Rating;
