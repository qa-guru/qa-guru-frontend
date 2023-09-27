import { styled } from "@mui/system";
import zIndex from "@mui/material/styles/zIndex";
import { Backdrop, Box } from "@mui/material";

export const StyledIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingBottom: "20px",
}));

export const StyledBackdropError = styled(Backdrop)(({ theme }) => ({
  zIndex: zIndex.drawer + 1,
}));
