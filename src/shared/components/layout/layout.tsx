import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "widgets/header";
import { StyledBox, StyledContainer } from "./layout.styled";
import { ILayout } from "./layout.types";
import Footer from "../../../widgets/footer";

const Layout: FC<ILayout> = ({ userRoles }) => {
  const location = useLocation();
  const isPage404 = location.pathname === "/404";

  return (
    <StyledBox>
      <Header userRoles={userRoles} />
      {isPage404 ? (
        <Outlet />
      ) : (
        <StyledContainer>
          <Outlet />
        </StyledContainer>
      )}
      <Footer />
    </StyledBox>
  );
};

export default Layout;
