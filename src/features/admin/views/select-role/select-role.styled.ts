import { Stack } from "@mui/material";
import { styled } from "@mui/system";

export const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.app.whiteGrey,
  borderRadius: "100px",
  [theme.breakpoints.only("xs")]: {
    borderRadius: "30px",
  },
  padding: "7px 7px 7px 18px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "100%",
}));
