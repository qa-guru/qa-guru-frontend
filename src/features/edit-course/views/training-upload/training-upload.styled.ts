import { Stack, styled } from "@mui/system";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledIconBox = styled(Box)({
  position: "relative",
});

export const StyledImageBox = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  width: "290px",
  height: "290px",
  [theme.breakpoints.only("xs")]: {
    width: "100px",
    height: "100px",
  },
  [theme.breakpoints.only("sm")]: {
    width: "290px",
    height: "290px",
  },
})) as typeof Box;

export const StyledLogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.app.primary,
  borderRadius: "10px",
  width: "290px",
  height: "290px",
  [theme.breakpoints.only("xs")]: {
    width: "100px",
    height: "100px",
  },
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

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.app.white,
})) as typeof LoadingButton;
