import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  marginTop: "5px",
  gap: theme.spacing(2),
}));
