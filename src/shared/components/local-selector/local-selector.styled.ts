import { styled } from "@mui/system";
import { FormControl, MenuItem, Select } from "@mui/material";

export const StyledFormControl = styled(FormControl)({
  "& .MuiInput-underline:after, & .MuiInput-underline:before": {
    display: "none",
  },
  margin: "auto",
  padding: "12px",
});

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "transparent",
  alignItems: "center",
  color: theme.palette.app.primary,
  "& .MuiSelect-icon": {
    color: theme.palette.app.primary,
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
  "& .MuiSelect-select:focus": {
    backgroundColor: "transparent",
  },
}));

export const StyledMenuItem = styled(MenuItem)({
  gap: "5px",
});
