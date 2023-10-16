import React from "react";
import { Outlet } from "react-router-dom";
import Header from "widgets/header";
import { StyledBox, StyledContainer } from "./layout.styled";
import { ILayout } from "./layout.types";

const Layout: React.FC<ILayout> = ({ userRoles }) => {
  return (
    <StyledBox>
      <Header userRoles={userRoles} />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </StyledBox>
  );
};

export default Layout;
