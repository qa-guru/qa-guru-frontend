import { styled } from "@mui/system";
import { FormControl, MenuItem, Select } from "@mui/material";

export const StyledFormControl = styled(FormControl)({
  "& .MuiInput-underline:after, & .MuiInput-underline:before": {
    display: "none",
  },
  margin: "auto",
});

export const StyledSelect = styled(Select)(({ theme }) => ({
  alignItems: "center",
  color: theme.palette.primary.main,
  "& .MuiSelect-icon": {
    color: theme.palette.primary.main,
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  gap: theme.spacing(2),
}));
