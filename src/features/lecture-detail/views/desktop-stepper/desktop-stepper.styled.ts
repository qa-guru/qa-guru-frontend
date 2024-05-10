import { styled } from "@mui/system";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Paper,
  Step,
  Stepper,
} from "@mui/material";
import { Clear } from "@mui/icons-material";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: "70px",
  left: "45px",
  color: theme.palette.app.white,
  backgroundColor: theme.palette.app.primary,
  "&:hover": {
    color: theme.palette.app.textSecondary,
    backgroundColor: theme.palette.app.secondary,
  },
  [theme.breakpoints.only("md")]: {
    left: "5px",
  },
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 2000,
  width: "43vw",
  backgroundColor: theme.palette.app.menu,
  [theme.breakpoints.down("md")]: {
    width: "100vw",
    top: "60px",
  },
}));

export const StyledClearIcon = styled(Clear)(({ theme }) => ({
  color: theme.palette.app.primary,
  marginRight: 0,
  cursor: "pointer",
}));

export const StyledStepper = styled(Stepper)(({ theme }) => ({
  width: "43vw",
  padding: "16px",
  maxHeight: "calc(100vh - 65px)",
  [theme.breakpoints.down("md")]: {
    width: "100vw",
  },
}));

export const StyledMobilePaper = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 3000,
  height: "60px",
}));

export const StyledStep = styled(Step)(({ theme }) => ({
  "& .MuiStepLabel-root .Mui-completed": {
    color: theme.palette.app.grey,
  },
  "& .MuiStepLabel-iconContainer": {
    color: theme.palette.app.primary,
  },
  "& .MuiStepLabel-label": {
    color: theme.palette.app.textPrimary,
  },
}));

export const StyledBackButton = styled(Button)({
  marginTop: "8px",
  marginRight: "8px",
});

export const StyledNextButton = styled(Button)(({ theme }) => ({
  marginTop: "8px",
  marginRight: "8px",
  color: theme.palette.app.white,
}));

export const StyledMobileIcon = styled(Icon)(({ theme }) => ({
  display: "flex",
  color: theme.palette.app.white,
  backgroundColor: theme.palette.app.primary,
  borderRadius: "50%",
  height: "35px",
  width: "35px",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    color: theme.palette.app.textSecondary,
    backgroundColor: theme.palette.app.secondary,
  },
}));
