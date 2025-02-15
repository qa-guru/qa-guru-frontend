import { styled } from "@mui/system";
import { Box, Button, MenuItem, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";

export const StyledButton = styled(Button)({
  padding: 0,
});

export const StyledBox = styled(Box)(({ theme }) => ({
  color: theme.palette.app.black,
  textTransform: "none",
  marginLeft: "20px",
  [theme.breakpoints.down("sm")]: {
    marginRight: "-20px",
    marginLeft: 0,
  },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  marginTop: "10.5px",
  marginLeft: "-25px",
  "& .MuiPaper-root": {
    borderRadius: "4px",
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}));

export const StyledUserBox = styled(Box)({
  padding: "8px 16px",
  flexWrap: "wrap",
});

export const StyledMenuItem = styled(MenuItem)({
  margin: 0,
  height: "40px",
  padding: "6px 16px",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  alignItems: "center",
  margin: 0,
  padding: 0,
}));
