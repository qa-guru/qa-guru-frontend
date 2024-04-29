import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  title: JSX.Element;
  id: number;
}

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<Maybe<HTMLElement>>(null);
  const navigate = useNavigate();
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
      title: <StyledLink to={pageURL}>{title}</StyledLink>,
      pageURL,
      id,
    });
  };

  const hasAccess = (roles: UserRole[]) =>
    useRoleAccess({ allowedRoles: roles });

  if (hasAccess([UserRole.Student])) {
    addPage(pages, "Главная", "/", 0);
  }

  const kanbanAccess = hasAccess([
    UserRole.Mentor,
    UserRole.Manager,
    UserRole.Master,
    UserRole.Student,
  ]);

  if (kanbanAccess) {
    const targetPages = isMobileOrTablet ? pages : kanbanPages;
    addPage(targetPages, "Доска заданий", "/kanban", 1);
  }

  if (hasAccess([UserRole.Mentor])) {
    const targetPages = isMobileOrTablet ? pages : kanbanPages;
    addPage(targetPages, "Доска ментора", "/kanban-mentor", 2);
  }

  if (hasAccess([UserRole.Student])) {
    const targetPages = isMobileOrTablet ? pages : kanbanPages;
    addPage(targetPages, "Доска студента", "/kanban-student", 3);
  }

  if (kanbanAccess && kanbanPages.length === 1) {
    addPage(pages, "Доска заданий", "/kanban", 4);
  }

  addPage(pages, "Топ 50", "/top-users", 5);

  const handleClickNavMenu = (pageURL: string) => {
    setAnchorElNav(null);
    navigate(pageURL);
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
            <StyledLogoIconButton
              disableRipple
              onClick={() => handleClickNavMenu("/")}
            >
              {settings.theme === "light" ? <StyledDarkLogo /> : <StyledLogo />}
            </StyledLogoIconButton>
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
