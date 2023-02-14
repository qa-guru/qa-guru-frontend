import { Box, Paper, Stack, SvgIcon } from "@mui/material";
import * as React from "react";
import { ReactComponent as Logo } from "../../../icons/logo-header.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Profile from "../Profile";
import AppMenu from "../Menu/Menu";
import MenuBurger from "../MenuBurger/MenuBurger";
import LocalSelector from "../../../shared/LocalSelector";

const style = {
  wrapper: {
    padding: { md: "7px 20px 7px", xs: 0 },
    maxWidth: "1920px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    marginBottom: "30px",
  },
  paper: { borderRadius: 0 },
  box: { display: "flex", alignItems: "center" },
  svgIcon: { mt: "7px", height: "31px", width: { xs: "120px", sm: "166px" } },
  link: { textDecoration: "none" },
};

const Header = () => {
  const [anchorElNav, setAnchorElNav] =
    React.useState<null | HTMLElement>(null);
  let navigate = useNavigate();
  const { t } = useTranslation();

  const pages = [
    {
      title: (
        <Link style={style.link} to="/">
          {t("page.home")}
        </Link>
      ),
      pageURL: "/",
    },
  ];

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
            <SvgIcon sx={style.svgIcon} viewBox="0 0 166 31">
              <Logo />
            </SvgIcon>
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
