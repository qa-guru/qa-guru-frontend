import { styled } from "@mui/system";
import { Container, Box } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const StyledContainer = styled(Container)({
  flexGrow: 1,
  minWidth: "100%",
});
