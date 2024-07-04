import { styled } from "@mui/system";
import { TabPanel } from "@mui/lab";
import { Typography } from "@mui/material";

export const StyledTypography = styled(Typography)({
  marginBottom: "15px",
});

export const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  padding: "10px 0 0",
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
}));
