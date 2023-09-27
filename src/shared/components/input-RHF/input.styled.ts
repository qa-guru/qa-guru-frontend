import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const StyledBox = styled(Box)(({ theme }) => ({
  "& > img": { marginRight: "20px", flexShrink: 0 },
}));

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
}));
