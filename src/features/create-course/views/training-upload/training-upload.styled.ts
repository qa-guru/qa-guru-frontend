import { Stack, styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledIconBox = styled(Box)(({ theme }) => ({
  position: "relative",
}));

export const StyledIconButton = styled("span")(({ theme }) => ({
  position: "absolute",
  bottom: "0px",
  right: "5px",
  cursor: "pointer",
  color: theme.palette.app.white,
}));

export const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  overflow: "hidden",
  position: "absolute",
});

export const StyledIconButtonDelete = styled("span")(({ theme }) => ({
  position: "absolute",
  top: "5px",
  right: "5px",
  cursor: "pointer",
  color: theme.palette.app.white,
}));

export const StyledAvatarButtonStack = styled(Stack)({
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});
