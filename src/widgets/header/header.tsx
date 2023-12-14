import { Box, IconButton } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalSelector } from "shared/components/buttons";
import useRoleAccess from "shared/hooks/use-role-access";
import { useTranslation } from "react-i18next";
import { UserRole } from "api/graphql/generated/graphql";
import { useAuth } from "features/authorization/context/auth-context";

import Profile from "./profile";
import AppMenu from "./menu/menu";
import MenuBurger from "./menu-burger/menu-burger";
import {
  StyledBox,
  StyledHeader,
  StyledLink,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "./header.styled";

interface IPages {
  pageURL: string;
  title: JSX.Element;
  id: number;
}

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { t } = useTranslation();
  const pages: IPages[] = [];
  const refreshPage = () => {
    navigate(0);
  };

  const hasHomeAccess = useRoleAccess({ allowedRoles: [UserRole.Student] });
  const hasKanbanAccess = useRoleAccess({
    allowedRoles: [
      UserRole.Mentor,
      UserRole.Manager,
      UserRole.Master,
      UserRole.Student,
    ],
  });

  if (hasHomeAccess) {
    pages.push({
      title: <StyledLink to="/">{t("page.home")}</StyledLink>,
      pageURL: "/",
      id: 0,
    });
  }

  if (hasKanbanAccess) {
    pages.push({
      title: <StyledLink to="/kanban">Доска заданий</StyledLink>,
      pageURL: "/kanban",
      id: 1,
    });
  }

  const handleClickNavMenu = (pageURL: string) => {
    setAnchorElNav(null);
    navigate(pageURL);
  };

  return (
    <StyledHeader>
      <StyledPaper>
        <StyledWrapper>
          {isAuth && (
            <MenuBurger
              pages={pages}
              setAnchorElNav={setAnchorElNav}
              handleClickNavMenu={handleClickNavMenu}
              anchorElNav={anchorElNav}
            />
          )}

          <StyledBox>
            <IconButton
              disableRipple
              onClick={() => (isAuth ? handleClickNavMenu("/") : refreshPage)}
            >
              <StyledLogo />
            </IconButton>
            <AppMenu handleClickNavMenu={handleClickNavMenu} pages={pages} />
          </StyledBox>

          <StyledStack>
            <Box>
              <LocalSelector />
            </Box>
            {isAuth && <Profile />}
          </StyledStack>
        </StyledWrapper>
      </StyledPaper>
    </StyledHeader>
  );
};

export default Header;
