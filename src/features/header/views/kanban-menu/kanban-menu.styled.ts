import { styled } from "@mui/system";
import Menu from "@mui/material/Menu";
import { Box, Button, Link } from "@mui/material";

export const StyledWrapperBox = styled(Box)(({ theme }) => ({
  width: "100%",
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
});

export const StyledButton = styled(Button)({
  height: "60.8px",
  "&:hover": { backgroundColor: "transparent" },
}) as typeof Button;

export const StyledLink = styled(Link)({
  textDecoration: "none",
  textAlign: "start",
});
