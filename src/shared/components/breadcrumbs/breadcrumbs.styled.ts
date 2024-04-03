import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";

export const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.app.textSecondary,
    fontWeight: theme.typography.fontWeightRegular,
    cursor: "pointer",
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  maxWidth: "1920px",
  margin: "0 auto",
  [theme.breakpoints.only("md")]: {
    padding: "0 20px",
  },
  [theme.breakpoints.only("sm")]: {
    padding: "0 5px",
  },
}));
