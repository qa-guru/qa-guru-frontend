import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";

export const StyledSchoolIcon = styled(StudentIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
  width: "10px",
}));

export const StyledCalendarBox = styled(Paper)(({ theme }) => ({
  position: "absolute",
  transform: "scale(0.8)",
  color: theme.palette.app.textPrimary,
  zIndex: 10,
  maxHeight: "310px",
  bottom: "-215px",
  right: "-5px",
  [theme.breakpoints.down("md")]: {
    bottom: "65px",
    right: "-5px",
  },
}));
