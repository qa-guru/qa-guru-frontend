import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const StyledMobileStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  gap: "15px",
  marginTop: "15px",
}));

export const StyledDateStack = styled(Stack)({
  flexDirection: "row",
  gap: "5px",
  flexWrap: "wrap",
});

export const StyledWebsiteStack = styled(Stack)({
  flexDirection: "row",
  gap: "5px",
});
