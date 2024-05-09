import { styled } from "@mui/system";
import { alpha, Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as CourseImg } from "assets/images/cousrse1.svg";
import { LoadingButton } from "@mui/lab";
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg";

interface IStyledCalendar {
  open: boolean;
}

export const StyledGrid = styled(Grid)({
  marginTop: 0,
  marginBottom: "20px",
  justifyContent: "space-between",
  position: "relative",
});

export const StyledCardActionArea = styled(Paper)({
  position: "relative",
  height: "100%",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const StyledImgBox = styled(Box)({
  margin: "-15px",
});

export const StyledCourseImg = styled(CourseImg)({
  width: "100%",
  height: "auto",
  objectFit: "contain",
  borderRadius: "10px 10px 0 0",
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
});

export const StyledCalendarBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<IStyledCalendar>(({ theme, open }) => ({
  marginTop: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "32px",
  height: "32px",
  alignSelf: "end",
  border: !open ? `1px solid ${alpha(theme.palette.app.primary, 0.5)}` : "none",
  borderRadius: "100px",
  "&:hover": {
    border: "none",
  },
}));

export const StyledCalendarIcon = styled(CalendarIcon, {
  shouldForwardProp: (prop) => prop !== "open",
})<IStyledCalendar>(({ open }) => ({
  width: "27px",
  height: "27px",
  padding: "4px",
  transform: open ? "scale(1.2)" : "none",
  transition: "transform 200ms ease-in-out",
  "&:hover": {
    transform: "scale(1.2)",
  },
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: "15px",
  color: theme.palette.app.white,
  alignSelf: "end",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.primary,
  textTransform: "uppercase",
}));

export const StyledUserGrid = styled(Grid)({
  padding: "16px 0",
  gap: "10px",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
});
