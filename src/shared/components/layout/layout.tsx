import React from "react";
import { Outlet } from "react-router-dom";
import { StyledBox, StyledContainer } from "./layout.styled";
import Header from "../../../widgets/header";
import { UserRole } from "../../../api/graphql/generated/graphql";
// import footer from "../widgets/footer";

interface LayoutProps {
  userRoles: Array<UserRole | null>;
}

const Layout: React.FC<LayoutProps> = ({ userRoles }) => {
  return (
    <StyledBox>
      <Header userRoles={userRoles} />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
      {/*<footer />*/}
    </StyledBox>
  );
};

export default Layout;
