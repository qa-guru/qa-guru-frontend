import { styled } from "@mui/system";
import Menu from "@mui/material/Menu";
import { Box, Button } from "@mui/material";

export const StyledWrapperBox = styled(Box)(({ theme }) => ({
  width: "100%",
  marginLeft: "10px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    borderRadius: "0",
    "& .MuiMenu-list": {
      padding: 0,
    },
    "& .MuiButtonBase-root": {
      justifyContent: "center",
      padding: "10px",
    },
  },
  marginLeft: "-28px",
});

export const StyledButton = styled(Button)({
  "&:hover": { backgroundColor: "transparent" },
}) as typeof Button;
