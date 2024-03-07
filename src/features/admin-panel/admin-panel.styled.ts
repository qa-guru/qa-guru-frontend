import { styled } from "@mui/system";
import { TabPanel } from "@mui/lab";
import { Box } from "@mui/material";

export const StyledContentBox = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 76px - 24px - 70px)",
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 157px - 24px - 70px )",
    overflow: "auto",
  },
}));

export const StyledTabPanel = styled(TabPanel)({
  padding: "15px 0 0",
});
