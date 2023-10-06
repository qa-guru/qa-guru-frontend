import { styled } from "@mui/system";
import { Stack, Box } from "@mui/material";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: "15px",
  justifyContent: "space-between",
  gap: theme.spacing(0.5),
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(3),
    justifyContent: "stretch",
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(0),
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(2),
  },
  alignItems: "center",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  [theme.breakpoints.up("sm")]: {
    marginTop: 0,
  },
}));

export const StyledUserRowBox = styled(Box)({
  marginTop: "16px",
});

export const StyledHomeworkContentBox = styled(Box)({
  marginTop: "7px",
});
