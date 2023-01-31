import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    "& .MuiInputBase-input": {
      padding: "12.5px 14px",
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.9rem",
    },
  },
}));
