import { styled } from "@mui/system";
import {
  alpha,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const StyledHomeworkDetails = styled(Box)(({ theme }) => ({
  height: "100%",
  overflowY: "auto",
  backgroundColor: alpha(theme.palette.app.secondary, 0.2),
  display: "flex",
  flexDirection: "column",
  marginTop: "15px",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: "35px 25px",
  overflowY: "auto",
  flex: 1,
  backgroundColor: theme.palette.app.lightGrey,
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "15px",
}));

export const StyledStatusContentBox = styled(Box)({
  marginTop: "15px",
});

export const StyledId = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  flexDirection: "row",
  alignItems: "center",
}));

export const StyledIcon = styled(OpenInNewIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "30px",
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
}));

export const StyledTitle = styled(Typography)({
  marginBottom: "15px",
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "35px",
  right: "28px",
  cursor: "pointer",
  backgroundColor: theme.palette.app.primary,
  color: theme.palette.app.white,
  width: "30px",
  height: "30px",
}));
