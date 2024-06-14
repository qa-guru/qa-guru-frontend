import { styled } from "@mui/system";
import { StarOutline } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";

interface IStyledRating {
  ratingColor: string;
}

export const StyledStarIcon = styled(StarOutline)(({ theme }) => ({
  color: theme.palette.app.pink,
  width: "60px",
  height: "60px",
  [theme.breakpoints.down("md")]: {
    width: "40px",
    height: "40px",
  },
}));

export const StyledRating = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "ratingColor",
})<IStyledRating>(({ theme, ratingColor }) => ({
  color: ratingColor,
  border: `1px solid ${ratingColor}`,
  minWidth: "24px",
  padding: "3px 4px",
  backgroundColor: theme.palette.app.menu,
  "& .MuiChip-label": {
    height: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      fontSize: "10px",
    },
  },
}));

export const StyledRatingStack = styled(Stack)({
  flexDirection: "row",
  gap: "8px",
});
