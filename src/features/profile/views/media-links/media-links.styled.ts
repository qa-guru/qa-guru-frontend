import { styled } from "@mui/system";
import { Link, Stack } from "@mui/material";

export const StyledIconStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  marginTop: "16px",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "start",
    marginTop: 0,
  },
}));

export const StyledLink = styled(Link)({
  display: "flex",
  justifyContent: "center",
  textDecoration: "none",
});
