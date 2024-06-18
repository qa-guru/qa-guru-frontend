import { FC, SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Container } from "@mui/material";
import { useResponsive } from "shared/hooks";

import UsersAdmin from "./users-admin";
import CourseAdmin from "./courses-admin";
import StatisticsAdmin from "./statistics-admin/statistics-admin";
import {
  StyledContentBox,
  StyledTabPanel,
  StyledTypography,
} from "./admin-panel.styled";

const AdminPanel: FC = () => {
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    {
      label: "Курсы",
      value: "1",
      path: "/admin-panel/courses",
      component: CourseAdmin,
    },
    {
      label: "Пользователи",
      value: "2",
      path: "/admin-panel/users",
      component: UsersAdmin,
    },
    {
      label: "Статистика",
      value: "3",
      path: "/admin-panel/statistics",
      component: StatisticsAdmin,
    },
  ];

  const currentRoute =
    routes.find((route) => route.path === location.pathname) || routes[0];
  const currentTabValue = currentRoute.value;

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    const newPath =
      routes.find((route) => route.value === newValue)?.path || routes[0].path;
    navigate(newPath);
  };

  const renderTabList = () => (
    <Box sx={{ borderColor: "divider" }}>
      <TabList onChange={handleChange}>
        {routes.map((route) => (
          <Tab key={route.value} label={route.label} value={route.value} />
        ))}
      </TabList>
    </Box>
  );

  const renderTabPanels = () => (
    <>
      {routes.map((route) => (
        <StyledTabPanel key={route.value} value={route.value}>
          <route.component />
        </StyledTabPanel>
      ))}
    </>
  );

  return (
    <Container>
      <StyledContentBox>
        <StyledTypography variant="h2">Панель администратора</StyledTypography>
        <TabContext value={currentTabValue}>
          {isDesktop && renderTabList()}
          {renderTabPanels()}
        </TabContext>
      </StyledContentBox>
    </Container>
  );
};

export default AdminPanel;
