import { Box, IconButton, Paper, Stack, SvgIcon } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Profile from "./profile";
import AppMenu from "./menu/menu";
import MenuBurger from "./menu-burger/menu-burger";
import { IHeader } from "./header.types";
import { style } from "./styles";
import { getHeaderByRole } from "./roles/header-by-role";
import { ReactComponent as Logo } from "../../assets/icons/logo-header.svg";
import LocalSelector from "../../shared/components/buttons/local-selector/local-selector";

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
    <header style={style.header}>
      <Paper sx={style.paper}>
        <Box sx={style.wrapper}>
          <MenuBurger
            pages={pages}
            setAnchorElNav={setAnchorElNav}
            handleClickNavMenu={handleClickNavMenu}
            anchorElNav={anchorElNav}
          />

          <Box sx={style.box}>
            <IconButton disableRipple onClick={() => handleClickNavMenu("/")}>
              <SvgIcon sx={style.svgIcon} viewBox="0 0 166 31">
                <Logo />
              </SvgIcon>
            </IconButton>
            <AppMenu handleClickNavMenu={handleClickNavMenu} pages={pages} />
          </Box>

          <Stack direction="row" alignItems="center">
            <Box>
              <LocalSelector />
            </Box>
            <Profile />
          </Stack>
        </Box>
      </Paper>
    </header>
  );
};

export default Header;
