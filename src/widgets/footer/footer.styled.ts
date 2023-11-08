import { styled } from "@mui/system";
import { Box, Paper } from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo-footer.svg";

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  textAlign: "start",
  padding: "10px 0 0",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  backgroundColor: theme.palette.purple.main,
}));

export const StyledWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1920px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "7px 20px 7px",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

export const StyledLogo = styled(Logo)(({ theme }) => ({
  marginTop: "7px",
  height: "25px",
  viewBox: "0 0 250 38",
  width: "120px",
  [theme.breakpoints.up("sm")]: {
    width: "166px",
  },
}));
