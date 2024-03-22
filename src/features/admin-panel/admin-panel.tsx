import { FC, SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Container } from "@mui/material";

import UsersAdmin from "./users-admin";
import CourseAdmin from "./courses-admin";
import StatisticsAdmin from "./statistics-admin/statistics-admin";
import {
  StyledContentBox,
  StyledTabPanel,
  StyledTypography,
} from "./admin-panel.styled";
import useResponsive from "../../shared/hooks/use-responsive";

const AdminPanel: FC = () => {
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();

  const tabPaths: { [key: string]: string } = {
    "1": "/admin-panel/courses",
    "2": "/admin-panel/users",
    "3": "/admin-panel/statistics",
  };

  const currentTabValue =
    Object.keys(tabPaths).find((key) => tabPaths[key] === location.pathname) ||
    "1";

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    navigate(tabPaths[newValue] || "/admin-panel");
  };

  return (
    <Container>
      <StyledContentBox>
        <StyledTypography variant="h2">Панель администратора</StyledTypography>
        <TabContext value={currentTabValue}>
          {isDesktop && (
            <Box sx={{ borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="Курсы" value="1" />
                <Tab label="Пользователи" value="2" />
                <Tab label="Статистика" value="3" />
              </TabList>
            </Box>
          )}
          <StyledTabPanel value="1">
            <CourseAdmin />
          </StyledTabPanel>
          <StyledTabPanel value="2">
            <UsersAdmin />
          </StyledTabPanel>
          <StyledTabPanel value="3">
            <StatisticsAdmin />
          </StyledTabPanel>
        </TabContext>
      </StyledContentBox>
    </Container>
  );
};

export default AdminPanel;
