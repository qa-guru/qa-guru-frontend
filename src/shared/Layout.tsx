import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth={"xl"}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
