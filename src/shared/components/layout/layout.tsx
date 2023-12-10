import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "widgets/header";
import Footer from "widgets/footer";

import { StyledBox, StyledContainer } from "./layout.styled";

const Layout: FC = () => {
  return (
    <StyledBox>
      <Header />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
      <Footer />
    </StyledBox>
  );
};

export default Layout;
