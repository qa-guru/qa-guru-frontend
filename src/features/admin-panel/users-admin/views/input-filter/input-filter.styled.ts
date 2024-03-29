import { styled } from "@mui/system";
import { IconButton, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "10px",
  width: "50%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "15px",
  },
}));
export const StyledIconsStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "8px",
}));

export const StyledIconButton = styled(IconButton)({
  padding: 0,
});

export const StyledTabPanel = styled(TabPanel)({
  padding: 0,
  marginBottom: "20px",
});
