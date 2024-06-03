import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const StyledIconStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  marginTop: "16px",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "start",
    marginTop: 0,
  },
}));
