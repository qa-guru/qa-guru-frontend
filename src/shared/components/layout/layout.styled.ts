import { styled } from "@mui/system";
import { Box, Container } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  minWidth: "100%",
});

export const StyledContainer = styled(Container)({
  flexGrow: 1,
  minWidth: "100%",
});
