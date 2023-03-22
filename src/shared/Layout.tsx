import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../features/Navigation/Header";
import Footer from "../features/Navigation/Footer";

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
