import { styled } from "@mui/system";
import { Box, Stack } from "@mui/material";

export const StyledTrainingStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  padding: "5px 10px",
});

export const StyledUserRowBox = styled(Box)({
  padding: "3px 10px",
});

export const StyledEditBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  [theme.breakpoints.only("sm")]: {
    flexDirection: "column",
  },
}));

export const StyledTeachersBox = styled(Box)({
  padding: "5px",
});
