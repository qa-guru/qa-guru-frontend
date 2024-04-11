import { styled } from "@mui/system";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";

export const StyledWrapperBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  marginTop: "14.5px",
  "& .MuiPaper-root": {
    borderRadius: "5px",
    width: "140px",

    "& .MuiMenu-list": {
      padding: 0,
    },
    "& .MuiButtonBase-root": {
      justifyContent: "center",
      padding: "10px",
    },
  },
}));
