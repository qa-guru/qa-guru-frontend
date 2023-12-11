import { styled } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";
import { ReactComponent as LensImage } from "assets/images/lens.svg";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.palette.purple.main,
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledLensImage = styled(LensImage)({
  width: "232px",
});

export const StyledAlignBox = styled(Stack)(({ theme }) => ({
  textAlign: "center",
  gap: theme.spacing(2),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.secondary,
}));

export const StyledCaptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.secondary,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  maxWidth: "300px",
  alignSelf: "center",
  gap: theme.spacing(1),
  color: theme.palette.white.main,
}));
