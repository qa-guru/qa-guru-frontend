import { styled } from "@mui/system";
import { alpha, Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as CourseImg } from "assets/images/cousrse1.svg";
import { LoadingButton } from "@mui/lab";
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg";

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

export const StyledCalendarBox = styled(Box)(({ theme }) => ({
  marginTop: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "32px",
  height: "32px",
  alignSelf: "end",
  border: `1px solid ${alpha(theme.palette.app.hoverBlue, 0.5)}`,
  borderRadius: "100px",
}));

export const StyledCalendarIcon = styled(CalendarIcon)({
  width: "25px",
  height: "25px",
  padding: "4px",
});

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: "15px",
  color: theme.palette.app.white,
  alignSelf: "end",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.primary,
  textTransform: "uppercase",
}));

export const StyledUserBox = styled(Box)({
  marginTop: "11px",
  padding: "16px 0",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
});
