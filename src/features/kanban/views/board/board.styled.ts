import { Box, Button, Stack, StepLabel, Stepper } from "@mui/material";
import { styled } from "@mui/system";

export const StyledWrapper = styled(Box)<{ showHomeworkDetails: boolean }>(
  ({ showHomeworkDetails }) => ({
    display: "grid",
    gridTemplateColumns: showHomeworkDetails ? "65% 1fr" : "100%",
    width: "100%",
    height: "100vh",
  })
);

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  marginTop: "15px",
}));

export const StyledMobileWrapper = styled(Box)({
  marginTop: "15px",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
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

export const StyledColumnBox = styled(Box)({
  height: "100%",
  overflow: "auto",
});
