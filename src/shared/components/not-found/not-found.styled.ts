import { styled } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";
import { ReactComponent as LensImage } from "assets/images/lens.svg";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.app.purple,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  top: "60px",
  bottom: "60px",
  width: "100%",
}));

export const StyledLensImage = styled(LensImage)({
  width: "232px",
});

export const StyledAlignBox = styled(Stack)(({ theme }) => ({
  textAlign: "center",
  gap: theme.spacing(2),
  margin: "0 0 50px",
  [theme.breakpoints.down("md")]: {
    margin: "0 0 120px",
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.white,
}));

export const StyledCaptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.white,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  maxWidth: "fit-content",
  alignSelf: "center",
  gap: theme.spacing(1),
  color: theme.palette.app.white,
}));
