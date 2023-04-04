import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "../widgets/Header";
import Footer from "../widgets/Footer";
import { UserRole } from "../api/graphql/generated/graphql";

interface LayoutProps {
  userRoles: Array<UserRole | null>;
}

const style = {
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
  },
};

const Layout: React.FC<LayoutProps> = ({ userRoles }) => {
  return (
    <Box sx={style.root}>
      <Header userRoles={userRoles} />
      <Container sx={style.content} maxWidth={"xl"}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
