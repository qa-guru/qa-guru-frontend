import { Box, Button, Stack, StepLabel, Stepper } from "@mui/material";
import { styled } from "@mui/system";

import { UI_CONSTANTS } from "../../constants";

interface IColumnBox {
  showHomeworkDetails: boolean;
  isUpLg: boolean;
}

export const StyledWrapper = styled(Box)({
  display: "flex",
  minWidth: "100%",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  marginTop: "5px",
}));

export const StyledMobileWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.only("sm")]: {
    marginTop: "10px",
  },
}));

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

export const StyledColumnBox = styled(Box, {
  shouldForwardProp: (prop) =>
    !["showHomeworkDetails", "isUpLg"].includes(prop as string),
})<IColumnBox>(({ showHomeworkDetails, isUpLg }) => ({
  width:
    showHomeworkDetails && isUpLg
      ? UI_CONSTANTS.MIN_COLUMN_WIDTH
      : UI_CONSTANTS.MAX_COLUMN_WIDTH,
}));
