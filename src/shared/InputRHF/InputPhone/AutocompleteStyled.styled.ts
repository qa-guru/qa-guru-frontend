import { styled } from "@mui/system";
import { Autocomplete } from "@mui/material";

export const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    "& .MuiOutlinedInput-root": {
      padding: "5px",
    },
  },
}));
