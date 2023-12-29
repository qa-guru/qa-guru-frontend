import { IconButton } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalSelector from "shared/components/local-selector";
import useRoleAccess from "shared/hooks/use-role-access";
import { useTranslation } from "react-i18next";
import { Maybe, UserRole } from "api/graphql/generated/graphql";

import Profile from "./profile";
import AppMenu from "./menu/menu";
import MenuBurger from "./menu-burger/menu-burger";
import {
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
  const [anchorElNav, setAnchorElNav] = useState<Maybe<HTMLElement>>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pages: IPages[] = [];

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
      title: <StyledLink to="/kanban">{t("page.board")}</StyledLink>,
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
          <StyledStack>
            <MenuBurger
              pages={pages}
              setAnchorElNav={setAnchorElNav}
              handleClickNavMenu={handleClickNavMenu}
              anchorElNav={anchorElNav}
            />
            <IconButton disableRipple onClick={() => handleClickNavMenu("/")}>
              <StyledLogo />
            </IconButton>
            <AppMenu handleClickNavMenu={handleClickNavMenu} pages={pages} />
          </StyledStack>
          <StyledStack>
            <LocalSelector />
            <Profile />
          </StyledStack>
        </StyledWrapper>
      </StyledPaper>
    </StyledHeader>
  );
};

export default Header;
