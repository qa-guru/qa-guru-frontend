import { FC, useState } from "react";
import useRoleAccess from "shared/hooks/use-role-access";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import ThemeSelector from "shared/components/theme-selector";
import useSettings from "shared/hooks/use-settings";
import useResponsive from "shared/hooks/use-responsive";

import Profile from "../../containers";
import AppMenu from "../menu/menu";
import MenuBurger from "../menu-burger/menu-burger";
import {
  StyledAppBar,
  StyledDarkLogo,
  StyledIconBox,
  StyledLink,
  StyledLogo,
  StyledLogoIconButton,
  StyledStack,
  StyledWrapper,
} from "./header.styled";
import KanbanMenu from "../kanban-menu";

interface IPages {
  pageURL: string;
  title: string;
  id: number;
}

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<Maybe<HTMLElement>>(null);
  const { settings } = useSettings();
  const { isMobileOrTablet } = useResponsive();

  const pages: IPages[] = [];
  const kanbanPages: IPages[] = [];

  const addPage = (
    pageList: IPages[],
    title: string,
    pageURL: string,
    id: number
  ) => {
    pageList.push({
      title,
      pageURL,
      id,
    });
  };

  const targetPages = isMobileOrTablet ? pages : kanbanPages;

  const hasStudentKanbanAccess = useRoleAccess({
    allowedRoles: [UserRole.Student, UserRole.Admin],
  });

  const hasMentorKanbanAccess = useRoleAccess({
    allowedRoles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  });

  const hasKanbanAccess = useRoleAccess({
    allowedRoles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  });

  const hasMainAccess = useRoleAccess({
    allowedRoles: [UserRole.Student, UserRole.Admin],
  });

  if (hasMainAccess) addPage(pages, "Главная", "/", 0);
  if (hasKanbanAccess) addPage(targetPages, "Доска заданий", "/kanban", 1);
  if (hasMentorKanbanAccess)
    addPage(targetPages, "Доска ментора", "/kanban-mentor", 2);
  addPage(pages, "Топ 50", "/top-users", 3);
  if (hasStudentKanbanAccess)
    addPage(targetPages, "Доска студента", "/kanban-student", 4);
  if (kanbanPages.length === 1)
    addPage(pages, "Доска студента", "/kanban-student", 5);

  const handleClickNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar position="fixed">
      <StyledWrapper>
        <StyledStack>
          <MenuBurger
            pages={pages}
            setAnchorElNav={setAnchorElNav}
            handleClickNavMenu={handleClickNavMenu}
            anchorElNav={anchorElNav}
          />
          <StyledIconBox>
            <StyledLink to="/">
              <StyledLogoIconButton disableRipple onClick={handleClickNavMenu}>
                {settings.theme === "light" ? (
                  <StyledDarkLogo />
                ) : (
                  <StyledLogo />
                )}
              </StyledLogoIconButton>
            </StyledLink>
          </StyledIconBox>
          <AppMenu handleClickNavMenu={handleClickNavMenu} pages={pages} />
          {kanbanPages.length > 1 && <KanbanMenu pages={kanbanPages} />}
        </StyledStack>
        <StyledStack>
          <ThemeSelector />
          <Profile />
        </StyledStack>
      </StyledWrapper>
    </StyledAppBar>
  );
};

export default Header;
