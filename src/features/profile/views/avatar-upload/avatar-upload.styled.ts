import { styled } from "@mui/system";
import { Box, Button, DialogContent, Paper, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Slider from "@mui/material/Slider";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "lightgray",
  borderRadius: "12px",
  width: "300px",
  height: "300px",
}));

export const StyledPersonIcon = styled(PersonIcon)(({ theme }) => ({
  width: "300px",
  height: "300px",
  color: theme.palette.white.main,
}));

export const StyledIconButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "2px",
  right: "-5px",
  color: theme.palette.purple.main,
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
  color: theme.palette.white.main,
}));
