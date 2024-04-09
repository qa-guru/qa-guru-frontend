import { styled } from "@mui/system";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
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
