import { FC, useCallback, useState } from "react";
import { Maybe } from "api/graphql/generated/graphql";
import ThemeSelector from "shared/components/theme-selector";
import { useSettings } from "shared/hooks";
import CustomLink from "shared/components/custom-link";
import { Button, Typography } from "@mui/material";

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
import { usePages } from "../../hooks/usePages";
import { useKanbanPages } from "../../hooks/useKanbanPages";

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<Maybe<HTMLElement>>(null);
  const { settings } = useSettings();
  const lightTheme = settings.theme === "light";

  const pages = usePages();
  const kanbanPages = useKanbanPages();

  const infoSystemPage = { title: "О Системе", pageURL: "/info-system", id: 6 };

  const handleClickNavMenu = useCallback(() => setAnchorElNav(null), []);

  const renderKanbanMenu = () => {
    if (kanbanPages.length === 1) {
      const { pageURL, title } = kanbanPages[0];
      return (
        <CustomLink path={pageURL}>
          <Button variant="text" disableRipple>
            <Typography variant="body2" noWrap>
              {title}
            </Typography>
          </Button>
        </CustomLink>
      );
    }

    return <KanbanMenu pages={kanbanPages} />;
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
            <CustomLink path="/">
              <StyledLogoIconButton disableRipple onClick={handleClickNavMenu}>
                {lightTheme ? <StyledDarkLogo /> : <StyledLogo />}
              </StyledLogoIconButton>
            </CustomLink>
          </StyledIconBox>
          <AppMenu handleClickNavMenu={handleClickNavMenu} pages={pages} />
          {renderKanbanMenu()}
          <CustomLink path={infoSystemPage.pageURL}>
            <Button variant="text" disableRipple>
              <Typography variant="body2" noWrap>
                {infoSystemPage.title}
              </Typography>
            </Button>
          </CustomLink>
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
