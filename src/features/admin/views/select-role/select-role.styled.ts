import { Stack } from "@mui/material";
import { styled } from "@mui/system";

export const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.08)",
  borderRadius: "100px",
  width: "min-content",
  padding: "3px 4px 3px 12px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));
