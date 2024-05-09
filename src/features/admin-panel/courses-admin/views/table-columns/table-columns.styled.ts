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

export const StyledEditBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});
