import { styled } from "@mui/system";
import { Box, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "3px",
}));

export const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    marginTop: "6.5px",
    borderRadius: "4px",
    "& .MuiMenu-list": {
      padding: 0,
    },
  },
});
