import { Box, IconButton } from "@mui/material";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalSelector } from "shared/components/buttons";
import { getHeaderByRole } from "shared/roles";

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

const Header: FC<IHeader> = ({ userRoles }) => {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isPage404 = location.pathname === "/404";

  const pages = getHeaderByRole(userRoles);

  const handleClickNavMenu = (pageURL: string) => {
    setAnchorElNav(null);
    navigate(pageURL);
  };

  return (
    <StyledHeader isPage404={isPage404}>
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
