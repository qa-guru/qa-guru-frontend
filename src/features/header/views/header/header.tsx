import { FC, useState } from "react";

import { IPages } from "features/header/types";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import ThemeSelector from "shared/components/theme-selector";
import { useSettings } from "shared/hooks";
import CustomLink from "shared/components/custom-link";

import { useRoleFilterPages } from "../../hooks/use-role-filter-pages";
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

const configPages: IPages[] = [
  {
    title: "Главная",
    pageURL: "/",
    roles: [UserRole.Student],
  },
  {
    title: "Топ 50",
    pageURL: "/top-users",
    roles: [UserRole.Student, UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  },
  {
    title: "Доски",
    menuPages: [
      {
        title: "Доска заданий",
        pageURL: "/kanban",
        roles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
      },
      {
        title: "Доска ментора",
        pageURL: "/kanban-mentor",
        roles: [UserRole.Mentor, UserRole.Lector],
      },
      {
        title: "Доска студента",
        pageURL: "/kanban-student",
        roles: [UserRole.Student],
      },
    ],
  },
  {
    title: "О Системе",
    pageURL: "/info-system",
    roles: [UserRole.Student, UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  },
];

const configMobilePages: IPages[] = [
  {
    title: "Главная",
    pageURL: "/",
    roles: [UserRole.Student],
  },
  {
    title: "Топ 50",
    pageURL: "/top-users",
    roles: [UserRole.Student, UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  },
  {
    title: "Доска заданий",
    pageURL: "/kanban",
    roles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  },
  {
    title: "Доска ментора",
    pageURL: "/kanban-mentor",
    roles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  },
  {
    title: "Доска студента",
    pageURL: "/kanban-student",
    roles: [UserRole.Student, UserRole.Admin],
  },
  {
    title: "О Системе",
    pageURL: "/info-system",
    roles: [UserRole.Student, UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  },
];

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<Maybe<HTMLElement>>(null);
  const { settings } = useSettings();
  const lightTheme = settings.theme === "light";

  const pages = useRoleFilterPages(configPages);
  const mobilePages = useRoleFilterPages(configMobilePages);

  const handleClickNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar position="fixed">
      <StyledWrapper>
        <StyledStack>
          <MenuBurger
            pages={mobilePages}
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
