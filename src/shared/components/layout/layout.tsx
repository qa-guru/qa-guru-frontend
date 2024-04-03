import { FC, ReactNode, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "widgets/header";
import Footer from "widgets/footer";

import {
  StyledBox,
  StyledBreadcrumbsBox,
  StyledBreadcrumbsContainer,
  StyledContainer,
} from "./layout.styled";
import CustomizedBreadcrumbs from "../breadcrumbs";
import useResponsive from "../../hooks/use-responsive";

interface ILayout {
  children?: ReactNode;
  isLogging?: boolean;
}

const Layout: FC<ILayout> = ({ children, isLogging }) => {
  const { isMobile } = useResponsive();
  const location = useLocation();
  const isKanban = useMemo(
    () => location.pathname === "/kanban",
    [location.pathname]
  );

  return (
    <StyledBox>
      {!isLogging && <Header />}
      {!isLogging && !isKanban && !isMobile && (
        <StyledBreadcrumbsContainer>
          <CustomizedBreadcrumbs />
        </StyledBreadcrumbsContainer>
      )}
      {!isLogging && isKanban && !isMobile && (
        <StyledBreadcrumbsBox>
          <CustomizedBreadcrumbs />
        </StyledBreadcrumbsBox>
      )}
      {children}
      <StyledContainer>
        <Outlet />
      </StyledContainer>
      <Footer />
    </StyledBox>
  );
};

export default Layout;
