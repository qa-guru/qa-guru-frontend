import { styled } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.white.main,
}));
