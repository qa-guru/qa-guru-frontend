import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const StyledWrapperStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export const StyledDateStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
});
