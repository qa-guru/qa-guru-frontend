import { FC, ReactNode, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "features/header";
import Footer from "shared/components/footer";

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

  const determineIsKanban = useMemo(() => {
    const regex = /^\/kanban(-mentor|-student)?\/?$/;
    return regex.test(location.pathname);
  }, [location.pathname]);

  const showBreadcrumbs = useMemo(
    () => !isLogging && !isMobile && !determineIsKanban,
    [isLogging, isMobile, determineIsKanban]
  );
  const showKanbanBreadcrumbs = useMemo(
    () => !isLogging && !isMobile && determineIsKanban,
    [isLogging, isMobile, determineIsKanban]
  );

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
