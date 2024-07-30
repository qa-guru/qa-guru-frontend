import { FC, ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Header } from "features/header";
import Footer from "shared/components/footer";
import { useResponsive } from "shared/hooks";

import {
  StyledBox,
  StyledBreadcrumbsBox,
  StyledBreadcrumbsContainer,
  StyledContainer,
} from "./layout.styled";
import CustomizedBreadcrumbs from "../breadcrumbs";

interface ILayout {
  children?: ReactNode;
  isLogging?: boolean;
}

const determineIsKanban = (pathname: string): boolean => {
  const regex = /^\/kanban(-mentor|-student)?\/?$/;
  return regex.test(pathname);
};

const Layout: FC<ILayout> = ({ children, isLogging }) => {
  const { isMobile } = useResponsive();
  const location = useLocation();

  const isKanban = determineIsKanban(location.pathname);

  const showBreadcrumbs = !isLogging && !isMobile && !isKanban;
  const showKanbanBreadcrumbs = !isLogging && !isMobile && isKanban;

  return (
    <StyledBox>
      {!isLogging && <Header />}
      {showBreadcrumbs && (
        <StyledBreadcrumbsContainer>
          <CustomizedBreadcrumbs />
        </StyledBreadcrumbsContainer>
      )}
      {showKanbanBreadcrumbs && (
        <StyledBreadcrumbsBox>
          <CustomizedBreadcrumbs />
        </StyledBreadcrumbsBox>
      )}
      {children}
      <StyledContainer isLogging={isLogging}>
        <Outlet />
      </StyledContainer>
      <Footer />
    </StyledBox>
  );
};

export default Layout;
