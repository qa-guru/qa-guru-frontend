import { styled } from "@mui/system";
import zIndex from "@mui/material/styles/zIndex";
import { Backdrop, Stack } from "@mui/material";

export const StyledIconStack = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingBottom: "20px",
  gap: "10px",
});

export const StyledBackdropError = styled(Backdrop)({
  zIndex: zIndex.drawer + 1,
});
