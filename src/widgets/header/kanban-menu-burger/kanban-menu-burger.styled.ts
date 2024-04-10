import { styled } from "@mui/system";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";

export const StyledWrapperBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  marginTop: "14px",
  "& .MuiPaper-root": {
    borderRadius: "0 0 5px 5px",
    width: "145px",
    marginLeft: "2px",
    boxShadow: "0px 3px 3px 0.1px rgba(0, 0, 0, 0.1)",

    "& .MuiMenu-list": {
      padding: 0,
    },
    "& .MuiButtonBase-root": {
      justifyContent: "center",
    },
  },
}));
