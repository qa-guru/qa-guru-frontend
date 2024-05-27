import { styled } from "@mui/system";
import { AvatarGroup, Box, Grid, Paper, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ReactComponent as LogoWhite } from "assets/icons/logo-white.svg";

// interface IStyledCalendar {
//   open: boolean;
// }

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

export const StyledPaper = styled(Paper)({
  padding: "15px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const StyledImgBox = styled(Box)({
  margin: "-15px",
});

export const StyledUserRowStack = styled(Stack)({
  flexDirection: "row",
  gap: "20px",
  margin: "16px 0",
});

export const StyledAvatarGroup = styled(AvatarGroup)({
  "& .MuiAvatar-root": {
    width: 35,
    height: 35,
    fontSize: 15,
  },
});

export const StyledLogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.app.primary,
  borderRadius: "10px 10px 0 0",
  width: "100%",
  height: "175px",
  objectFit: "cover",
  marginBottom: "10px",
}));

export const StyledLogoWhite = styled(LogoWhite)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    width: "90px",
    height: "90px",
  },
}));

// export const StyledCalendarBox = styled(Box, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<IStyledCalendar>(({ theme, open }) => ({
//   marginTop: "15px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "32px",
//   height: "32px",
//   alignSelf: "end",
//   border: !open ? `1px solid ${alpha(theme.palette.app.primary, 0.5)}` : "none",
//   borderRadius: "100px",
//   "&:hover": {
//     border: "none",
//   },
// }));

// export const StyledCalendarIcon = styled(CalendarIcon, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<IStyledCalendar>(({ open }) => ({
//   width: "27px",
//   height: "27px",
//   padding: "4px",
//   transform: open ? "scale(1.2)" : "none",
//   transition: "transform 200ms ease-in-out",
//   "&:hover": {
//     transform: "scale(1.2)",
//   },
// }));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: "15px",
  alignSelf: "flex-end",
}));

// export const StyledTypography = styled(Typography)(({ theme }) => ({
//   color: theme.palette.app.primary,
//   textTransform: "uppercase",
// }));

// export const StyledUserGrid = styled(Grid)({
//   padding: "16px 0",
//   gap: "10px",
// });

// export const StyledBox = styled(Box)({
//   display: "flex",
//   justifyContent: "flex-end",
//   marginTop: "20px",
// });

export const StyledTeachersBox = styled(Box)({
  padding: "5px",
});
