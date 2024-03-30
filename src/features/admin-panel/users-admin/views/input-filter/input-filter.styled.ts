import { styled } from "@mui/system";
import { IconButton, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";

interface IStyledIconInputButton {
  isActive: boolean;
}

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "10px",
  width: "50%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "10px",
  },
}));
export const StyledIconsStack = styled(Stack)({
  flexDirection: "row",
  gap: "8px",
});

export const StyledIconButton = styled(IconButton)({
  padding: 0,
});

export const StyledIconInputButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<IStyledIconInputButton>(({ theme, isActive }) => ({
  padding: 0,
  color: isActive ? theme.palette.app.primary : theme.palette.app.grey,
}));

export const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  padding: 0,
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "10px",
  },
}));
