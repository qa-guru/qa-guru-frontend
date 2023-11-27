import { styled } from "@mui/system";
import { FormHelperText } from "@mui/material";

interface IStyledFormHelperText {
  multiline?: boolean;
}

export const StyledFormHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) => prop !== "multiline",
})<IStyledFormHelperText>(({ multiline }) => ({
  position: "absolute",
  top: multiline ? "72px" : "52px",
}));
