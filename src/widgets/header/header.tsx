import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoleAccess from "shared/hooks/use-role-access";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import Profile from "./profile";
import AppMenu from "./menu/menu";
import MenuBurger from "./menu-burger/menu-burger";
import {
  StyledDarkLogo,
  StyledHeader,
  StyledIconBox,
  StyledIconButton,
  StyledLink,
  StyledLogo,
  StyledLogoIconButton,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "./header.styled";
import useSettings from "../../shared/hooks/use-settings";

interface IPages {
  pageURL: string;
  title: JSX.Element;
  id: number;
}

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<Maybe<HTMLElement>>(null);
  const navigate = useNavigate();
  const pages: IPages[] = [];
  const { settings, toggleTheme } = useSettings();

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
      title: <StyledLink to="/">Главная</StyledLink>,
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

  pages.push({
    title: <StyledLink to="/users">Топ 50</StyledLink>,
    pageURL: "/users",
    id: 2,
  });

  const handleClickNavMenu = (pageURL: string) => {
    setAnchorElNav(null);
    navigate(pageURL);
  };

  return (
    <StyledHeader>
      <StyledPaper>
        <StyledWrapper>
          <StyledStack>
            <MenuBurger
              pages={pages}
              setAnchorElNav={setAnchorElNav}
              handleClickNavMenu={handleClickNavMenu}
              anchorElNav={anchorElNav}
            />
            <StyledIconBox>
              <StyledLogoIconButton
                disableRipple
                onClick={() => handleClickNavMenu("/")}
              >
                {settings.theme === "light" ? (
                  <StyledDarkLogo />
                ) : (
                  <StyledLogo />
                )}
              </StyledLogoIconButton>
            </StyledIconBox>
            <AppMenu handleClickNavMenu={handleClickNavMenu} pages={pages} />
          </StyledStack>
          <StyledStack>
            <StyledIconButton onClick={toggleTheme}>
              {settings.theme === "light" ? (
                <Brightness7 color="primary" />
              ) : (
                <Brightness4 color="primary" />
              )}
            </StyledIconButton>
            {/* {settings.theme === "light" ? (
              <StyledSelectorBox>
                <LocalSelector />
              </StyledSelectorBox>
            ) : (
              <LocalSelector />
            )} */}
            <Profile />
          </StyledStack>
        </StyledWrapper>
      </StyledPaper>
    </StyledHeader>
  );
};

export default Header;
