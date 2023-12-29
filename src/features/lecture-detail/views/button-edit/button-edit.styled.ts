import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
  marginTop: "15px",
}));
