import { styled } from "@mui/system";
import { Box, ListItemText, MenuItem, MenuList, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";

export const StyledBox = styled(Box)(({ theme }) => ({
  color: theme.palette.black.main,
  textTransform: "none",
}));

export const StyledMenu = styled(Menu)({
  marginTop: "7px",
  "& .MuiPaper-root": {
    borderRadius: "3px",
  },
});

export const StyledUserBox = styled(Box)({
  padding: "0 10px 10px",
  flexWrap: "wrap",
});

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.black.main,
  margin: "5px",
}));

export const StyledMenuList = styled(MenuList)({
  margin: 0,
  padding: 0,
});

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  margin: 0,
  padding: "5px",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  alignItems: "center",
  margin: 0,
  padding: 0,
}));

export const StyledListItemText = styled(ListItemText)({
  marginRight: "3.5vw",
});
