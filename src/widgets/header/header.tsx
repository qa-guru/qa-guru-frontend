import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoleAccess from "shared/hooks/use-role-access";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import ThemeSelector from "shared/components/theme-selector";
import useSettings from "shared/hooks/use-settings";

import Profile from "./profile";
import AppMenu from "./menu/menu";
import MenuBurger from "./menu-burger/menu-burger";
import {
  StyledDarkLogo,
  StyledHeader,
  StyledIconBox,
  StyledLink,
  StyledLogo,
  StyledLogoIconButton,
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
  const [anchorElNav, setAnchorElNav] = useState<Maybe<HTMLElement>>(null);
  const navigate = useNavigate();
  const pages: IPages[] = [];
  const { settings } = useSettings();

  const hasHomeAccess = useRoleAccess({ allowedRoles: [UserRole.Student] });
  const hasStudentAccess = useRoleAccess({
    allowedRoles: [UserRole.Mentor],
  });
  const hasMentorAccess = useRoleAccess({
    allowedRoles: [UserRole.Mentor],
  });

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

  if (hasMentorAccess) {
    pages.push({
      title: <StyledLink to="/kanban-mentor">Доска ментора</StyledLink>,
      pageURL: "/kanban-mentor",
      id: 2,
    });
  }

  if (hasStudentAccess) {
    pages.push({
      title: <StyledLink to="/kanban-student">Доска студента</StyledLink>,
      pageURL: "/kanban-student",
      id: 3,
    });
  }

  pages.push({
    title: <StyledLink to="/top-users">Топ 50</StyledLink>,
    pageURL: "/top-users",
    id: 4,
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
            <ThemeSelector />
            <Profile />
          </StyledStack>
        </StyledWrapper>
      </StyledPaper>
    </StyledHeader>
  );
};

export default Header;
