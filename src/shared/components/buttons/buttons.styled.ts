import { Box, styled } from "@mui/system";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const StyledNavigateButton = styled(Button)(({ theme }) => ({
  marginBottom: "25px",
  color: theme.palette.primary.main,
}));

export const StyledIcon = styled(ChevronLeftIcon)({
  marginRight: "10px",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginRight: "1vw",
});

export const StyledFormControl = styled(FormControl)({
  "& .MuiInput-underline:after, & .MuiInput-underline:before": {
    display: "none",
  },
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
