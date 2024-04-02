import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "widgets/header";
import Footer from "widgets/footer";
import { Container } from "@mui/material";

import { StyledBox, StyledContainer } from "./layout.styled";
import CustomizedBreadcrumbs from "../breadcrumbs";

interface ILayout {
  children?: ReactNode;
  isLogging?: boolean;
}

const Layout: FC<ILayout> = ({ children, isLogging }) => {
  return (
    <StyledBox>
      {!isLogging && <Header />}
      <Container>
        <CustomizedBreadcrumbs />
      </Container>

      {children}
      <StyledContainer>
        <Outlet />
      </StyledContainer>
      <Footer />
    </StyledBox>
  );
};

export default Layout;
