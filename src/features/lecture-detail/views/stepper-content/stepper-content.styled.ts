import { styled } from "@mui/system";
import { Box, Button, Step, Stepper } from "@mui/material";

export const StyledButtonBox = styled(Box)({
  marginBottom: "16px",
});

export const StyledBackButton = styled(Button)({
  marginTop: "8px",
  marginRight: "8px",
});

export const StyledNextButton = styled(Button)(({ theme }) => ({
  marginTop: "8px",
  marginRight: "8px",
  color: theme.palette.app.white,
}));

export const StyledStepper = styled(Stepper)(({ theme }) => ({
  width: "43vw",
  padding: "16px",
  maxHeight: "calc(100vh - 60px)",
  [theme.breakpoints.down("md")]: {
    width: "100vw",
    padding: "16px 16px 70px",
    overflowY: "scroll",
    scrollbarWidth: "none",
  },
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
  cursor: "pointer",
}));
