import React from "react";
import Header from "../header/Header/Header";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth={"xl"}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
