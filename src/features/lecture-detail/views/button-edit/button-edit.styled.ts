import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  minWidth: "147px",
  marginTop: "15px",
}));
