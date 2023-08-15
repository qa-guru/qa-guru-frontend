import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { style } from "./styles";
import Header from "../../widgets/Header";
import { UserRole } from "../../api/graphql/generated/graphql";
// import Footer from "../widgets/Footer";

interface LayoutProps {
  userRoles: Array<UserRole | null>;
}

const Layout: React.FC<LayoutProps> = ({ userRoles }) => {
  return (
    <Box sx={style.root}>
      <Header userRoles={userRoles} />
      <Container sx={style.content} maxWidth={"xl"}>
        <Outlet />
      </Container>
      {/*<Footer />*/}
    </Box>
  );
};

export default Layout;
