import { Container, Box, styled } from "@mui/system";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  minWidth: "100%",
}));
