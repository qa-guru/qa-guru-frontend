import { Box, IconButton, Paper, Stack, SvgIcon } from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as Logo } from "../../../assets/icons/logo-header.svg";
import Profile from "./Profile";
import AppMenu from "./Menu/Menu";
import MenuBurger from "./MenuBurger/MenuBurger";
import LocalSelector from "../../../shared/LocalSelector";
import { primary } from "../../../theme/colors";

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
  link: { textDecoration: "none", color: primary.main },
};

const Header = () => {
  const [anchorElNav, setAnchorElNav] =
    React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
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
            <IconButton onClick={() => handleClickNavMenu("/")}>
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
