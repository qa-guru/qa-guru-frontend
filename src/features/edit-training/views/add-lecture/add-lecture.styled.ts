import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
}));
