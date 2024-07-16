import { styled } from "@mui/system";
import { FormHelperText } from "@mui/material";

export const StyledImgBox = styled("li")({
  "& > img": { marginRight: "20px", flexShrink: 0 },
});

export const StyledFormHelperText = styled(FormHelperText)({
  position: "absolute",
  top: "52px",
});
