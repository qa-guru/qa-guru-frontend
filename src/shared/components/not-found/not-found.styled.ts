import { styled } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";
import { ReactComponent as LensImage } from "assets/images/lens.svg";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: "76px",
  bottom: "70px",
  width: "100%",
  backgroundColor: theme.palette.app.purple,
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    marginTop: "-24px",
    position: "static",
  },
}));

export const StyledLensImage = styled(LensImage)({
  width: "232px",
});

export const StyledAlignBox = styled(Stack)(({ theme }) => ({
  textAlign: "center",
  gap: theme.spacing(2),
  margin: "0 0 8vh",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.secondary,
}));

export const StyledCaptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.secondary,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  maxWidth: "fit-content",
  alignSelf: "center",
  gap: theme.spacing(1),
  color: theme.palette.app.white,
}));
