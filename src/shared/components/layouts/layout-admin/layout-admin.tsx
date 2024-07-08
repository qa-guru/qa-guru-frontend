import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "features/header";
import { useResponsive } from "shared/hooks";

import {
  StyledBox,
  StyledBreadcrumbsBox,
  StyledContainer,
} from "../layouts.styled";
import CustomizedBreadcrumbs from "../../breadcrumbs";

interface ILayoutAdmin {
  children?: ReactNode;
}

const LayoutAdmin: FC<ILayoutAdmin> = ({ children }) => {
  const { isMobile } = useResponsive();

  return (
    <StyledBox>
      <Header />
      {!isMobile && (
        <StyledBreadcrumbsBox>
          <CustomizedBreadcrumbs />
        </StyledBreadcrumbsBox>
      )}
      {children}
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </StyledBox>
  );
};

export default LayoutAdmin;
