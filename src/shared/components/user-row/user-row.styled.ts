import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";

interface IStyledWrapperStack {
  hideFullName?: boolean;
}

export const StyledWrapperStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "hideFullName",
})<IStyledWrapperStack>(({ hideFullName }) => ({
  flexDirection: "row",
  gap: hideFullName ? "0px" : "10px",
  alignItems: "center",
  textAlign: "start",
}));

export const StyledStack = styled(Stack)({
  flexDirection: "row",
  gap: "8px",
  alignItems: "center",
  textAlign: "start",
  justifyContent: "space-between",
});

export const StyledBox = styled(Box)({
  lineHeight: "5px",
});
