import { styled } from "@mui/system";
import { Tab } from "@mui/material";
import { TabList, TabPanel } from "@mui/lab";

export const StyledTabList = styled(TabList)(({ theme }) => ({
  padding: 0,
  margin: "10px 0 -1.3px",
  minHeight: 0,
  "& .Mui-selected": {
    borderBottom: "none",
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.app.primary,
  border: `1.2px solid ${theme.palette.app.secondary}`,
  borderRadius: "10px 10px 0 0",
  borderBottom: "none",
  textTransform: "none",
  minHeight: "35px",
  padding: 0,
  margin: "0 5px 0 0",
}));

export const StyledTabPanel = styled(TabPanel)({
  padding: 0,
  marginBottom: "20px",
});
