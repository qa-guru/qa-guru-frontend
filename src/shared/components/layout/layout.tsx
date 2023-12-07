import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "widgets/header";

import { StyledBox, StyledContainer } from "./layout.styled";
import { ILayout } from "./layout.types";
import Footer from "../../../widgets/footer";

const Layout: FC<ILayout> = ({ userRoles }) => {
  return (
    <StyledBox>
      <Header userRoles={userRoles} />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
      <Footer />
    </StyledBox>
  );
};

export default Layout;
