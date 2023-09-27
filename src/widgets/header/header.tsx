import { Box, IconButton } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LocalSelector from "shared/components/buttons/local-selector/local-selector";
import Profile from "./profile";
import AppMenu from "./menu/menu";
import MenuBurger from "./menu-burger/menu-burger";
import { IHeader } from "./header.types";
import {
  StyledBox,
  StyledHeader,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "./header.styled";
import { getHeaderByRole } from "./roles/header-by-role";

const Header: React.FC<IHeader> = ({ userRoles }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(
    null
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  const pages = getHeaderByRole(userRoles, t);

  const handleClickNavMenu = (pageURL: string) => {
    setAnchorElNav(null);
    navigate(pageURL);
  };

  return (
    <StyledHeader>
      <StyledPaper>
        <StyledWrapper>
          <MenuBurger
            pages={pages}
            setAnchorElNav={setAnchorElNav}
            handleClickNavMenu={handleClickNavMenu}
            anchorElNav={anchorElNav}
          />

          <StyledBox>
            <IconButton disableRipple onClick={() => handleClickNavMenu("/")}>
              <StyledLogo />
            </IconButton>
            <AppMenu handleClickNavMenu={handleClickNavMenu} pages={pages} />
          </StyledBox>

          <StyledStack>
            <Box>
              <LocalSelector />
            </Box>
            <Profile />
          </StyledStack>
        </StyledWrapper>
      </StyledPaper>
    </StyledHeader>
  );
};

export default Header;
