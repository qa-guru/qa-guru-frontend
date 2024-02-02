import { styled } from "@mui/system";
import { Box, Button, DialogContent, Paper, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Slider from "@mui/material/Slider";

export const StyledPaper = styled(Paper)({
  padding: "24px",
});

export const StyledIconBox = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.app.primary,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  width: "20vw",
  height: "20vw",
}));

export const StyledPersonIcon = styled(PersonIcon)(({ theme }) => ({
  width: "20vw",
  height: "20vw",
  color: theme.palette.app.white,
}));

export const StyledIconButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "-10px",
  right: "-15px",
  color: theme.palette.app.white,
}));

export const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "50px",
});

export const StyledSlider = styled(Slider)({
  width: "80%",
});

export const StyledButtonsStack = styled(Stack)({
  display: "flex",
  marginTop: "90px",
  flexDirection: "row",
  gap: "16px",
  justifyContent: "center",
  alignItems: "center",
});

export const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  overflow: "hidden",
  position: "absolute",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "110px",
  color: theme.palette.app.white,
}));
