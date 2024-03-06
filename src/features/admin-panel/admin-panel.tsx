import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Container, Typography } from "@mui/material";

import UsersAdmin from "./users-admin";
import CourseAdmin from "./courses-admin";
import StatisticsAdmin from "./statistics-admin/statistics-admin";
import { StyledTabPanel } from "./admin-panel.styled";

const AdminPanel: FC = () => {
  const [value, setValue] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Typography mb={2} variant="h2">
        Панель администратора
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Курсы" value="1" />
            <Tab label="Пользователи" value="2" />
            <Tab label="Статистика" value="3" />
          </TabList>
        </Box>
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
    </Container>
  );
};

export default AdminPanel;
