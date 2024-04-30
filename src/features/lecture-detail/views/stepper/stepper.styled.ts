import { styled } from "@mui/system";
import { Button, IconButton, Step, Stepper } from "@mui/material";

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
}));

export const StyledStepper = styled(Stepper)({
  width: "40vw",
  padding: "15px",
});

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
