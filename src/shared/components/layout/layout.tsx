import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { style } from "./styles";
import Header from "../../../widgets/header";
import { UserRole } from "../../../api/graphql/generated/graphql";
// import footer from "../widgets/footer";

interface LayoutProps {
  userRoles: Array<UserRole | null>;
}

const Layout: React.FC<LayoutProps> = ({ userRoles }) => {
  return (
    <Box sx={style.root}>
      <Header userRoles={userRoles} />
      <Container sx={style.content}>
        <Outlet />
      </Container>
      {/*<footer />*/}
    </Box>
  );
};

export default Layout;
