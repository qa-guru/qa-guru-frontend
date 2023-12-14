import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "widgets/header";
import Footer from "widgets/footer";

import { StyledBox, StyledContainer } from "./layout.styled";

interface ILayout {
  children?: ReactNode;
  isAuth?: boolean;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <StyledBox>
      <Header />
      {children}
      <StyledContainer>
        <Outlet />
      </StyledContainer>
      <Footer />
    </StyledBox>
  );
};

export default Layout;
