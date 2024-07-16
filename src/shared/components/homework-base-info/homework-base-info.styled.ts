import { styled } from "@mui/system";
import { Stack, Typography } from "@mui/material";

export const StyledRowStack = styled(Stack)({
  gap: "16px",
  flexDirection: "row",
  marginTop: "25px",
});

export const StyledColumnStack = styled(Stack)({
  flexDirection: "column",
});

export const StyledTypography = styled(Typography)({
  flexWrap: "nowrap",
});
