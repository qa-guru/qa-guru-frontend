import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)({
  marginBottom: "24px",
});

export const StyledIframeBox = styled(Box)({
  overflow: "hidden",
  paddingBottom: "40.25%",
  position: "relative",
  height: 0,
});

export const StyledIframe = styled("iframe")({
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  width: "70%",
});
