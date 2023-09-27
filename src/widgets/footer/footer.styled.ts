import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/icons/logo-footer.svg";

export const StyledFooter = styled("footer")(({ theme }) => ({
  paddingTop: "50px",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.purplr.main,
  width: "100%",
  textAlign: "center",
  padding: "10px 0 0",
}));

export const StyledLogo = styled(Logo)(({ theme }) => ({
  marginTop: "7px",
  height: "31px",
  viewBox: "0 0 250 38",
  width: "120px",
  [theme.breakpoints.up("sm")]: {
    width: "166px",
  },
}));
