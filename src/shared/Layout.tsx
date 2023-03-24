import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "../features/Navigation/Header";
import Footer from "../features/Navigation/Footer";

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

const Layout: React.FC = () => {
  return (
    <Box sx={style.root}>
      <Header />
      <Container sx={style.content} maxWidth={"xl"}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
