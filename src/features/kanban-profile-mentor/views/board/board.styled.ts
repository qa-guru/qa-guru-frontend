import { Box, Button, Stack, StepLabel, Stepper } from "@mui/material";
import { styled } from "@mui/system";

interface IColumnBox {
  showHomeworkDetails: boolean;
  isUpLg: boolean;
}

export const StyledWrapper = styled(Box)({
  display: "flex",
  minWidth: "100%",
});

export const StyledColumnBox = styled(Box)({
  minWidth: "100%",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  marginTop: "15px",
}));

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
});

export const StyledStepper = styled(Stepper)(({ theme }) => ({
  overflowX: "scroll",
  "& .MuiStepLabel-iconContainer": {
    display: "none",
  },
  "& .MuiStepLabel-label.Mui-active": {
    color: theme.palette.app.primary,
  },
  "& .MuiStepLabel-label.Mui-completed": {
    color: theme.palette.app.textSecondary,
    fontWeight: "normal",
  },
  scrollbarWidth: "none",
}));

export const StyledStepLabel = styled(StepLabel)({
  whiteSpace: "nowrap",
  textTransform: "uppercase",
});

export const StyledStepperButton = styled(Button)({
  minWidth: "5px",
});
