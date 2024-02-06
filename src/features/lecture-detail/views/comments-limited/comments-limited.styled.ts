import { styled } from "@mui/system";
import { Stack, Typography } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  marginTop: "5px",
  // gap: theme.spacing(2),
}));

export const StyledTypography = styled(Typography)({
  margin: "20px 0",
});
