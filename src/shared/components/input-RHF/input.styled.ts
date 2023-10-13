import { styled } from "@mui/system";
import { InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const StyledImgBox = styled("li")({
  "& > img": { marginRight: "20px", flexShrink: 0 },
});

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.white.main,
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
}));
