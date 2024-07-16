import { styled } from "@mui/system";
import { InputLabel } from "@mui/material";

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.app.white
      : theme.palette.app.purple,
}));
