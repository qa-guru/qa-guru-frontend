import { styled } from "@mui/system";
import { Box, ListItemText, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";

export const StyledBox = styled(Box)(({ theme }) => ({
  color: theme.palette.black.main,
  textTransform: "none",
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  marginTop: "3px",
  "& .MuiPaper-root": {
    borderRadius: "3px",
  },
}));

export const StyledUserBox = styled(Box)(({ theme }) => ({
  margin: "0 10px 10px",
  flexWrap: "wrap",
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.black.main,
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  marginTop: "8px",
  flexDirection: "row",
  gap: theme.spacing(2),
  alignItems: "center",
}));

export const StyledListItemText = styled(ListItemText)({
  marginRight: "3.5vw",
});
