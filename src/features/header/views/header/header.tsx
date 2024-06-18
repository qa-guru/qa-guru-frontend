import { FC, useState } from "react";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import ThemeSelector from "shared/components/theme-selector";
import { useRoleAccess, useSettings, useResponsive } from "shared/hooks";
import CustomLink from "shared/components/custom-link";

import Profile from "../../containers";
import AppMenu from "../menu/menu";
import MenuBurger from "../menu-burger/menu-burger";
import {
  StyledAppBar,
  StyledDarkLogo,
  StyledIconBox,
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
  const lightTheme = settings.theme === "light";

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

  if (hasMainAccess) addPage(pages, "Домой", "/", 0);
  if (hasKanbanAccess) addPage(targetPages, "Доска заданий", "/kanban", 2);
  if (hasMentorKanbanAccess)
    addPage(targetPages, "Доска ментора", "/kanban-mentor", 3);
  addPage(pages, "Топ 50", "/top-users", 4);
  if (hasStudentKanbanAccess)
    addPage(targetPages, "Доска студента", "/kanban-student", 5);
  if (kanbanPages.length === 1)
    addPage(pages, "Доска студента", "/kanban-student", 6);
  addPage(pages, "О Системе", "/info-system", 1);

  const handleClickNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderKanbanMenu = () =>
    kanbanPages.length > 1 && <KanbanMenu pages={kanbanPages} />;

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
            <CustomLink path="/">
              <StyledLogoIconButton disableRipple onClick={handleClickNavMenu}>
                {lightTheme ? <StyledDarkLogo /> : <StyledLogo />}
              </StyledLogoIconButton>
            </CustomLink>
          </StyledIconBox>
          <AppMenu handleClickNavMenu={handleClickNavMenu} pages={pages} />
          {renderKanbanMenu()}
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
