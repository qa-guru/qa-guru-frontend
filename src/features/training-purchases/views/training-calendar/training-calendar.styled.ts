import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledSchoolIcon = styled(StudentIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
  width: "10px",
}));

export const StyledCalendarBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "-218px",
  right: "-32px",
  transform: "scale(0.8)",
  backgroundColor: theme.palette.app.white,
  zIndex: 2,
  borderRadius: "5px",
}));
