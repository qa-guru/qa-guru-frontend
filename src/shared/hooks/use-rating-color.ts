import { useMemo } from "react";
import { useTheme } from "@mui/system";

export const useRatingColor = (rating: string) => {
  const theme = useTheme();

  return useMemo(() => {
    const ratingValue = parseInt(rating, 10);
    let colorKey;

    if (ratingValue < 50) colorKey = "upTo50";
    else if (ratingValue < 100) colorKey = "upTo100";
    else if (ratingValue < 200) colorKey = "upTo200";
    else if (ratingValue < 500) colorKey = "upTo500";
    else if (ratingValue < 1000) colorKey = "upTo1000";
    else colorKey = "upTo2000";

    return theme.palette.app.rating[colorKey];
  }, [rating, theme]);
};
