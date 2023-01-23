import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Footer from "../shared/Footer";

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
