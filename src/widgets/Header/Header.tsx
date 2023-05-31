import { Box, IconButton, Paper, Stack, SvgIcon } from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";
import AppMenu from "./Menu/Menu";
import MenuBurger from "./MenuBurger/MenuBurger";
import { IHeader } from "./Header.types";
import { style } from "./styles";
import { ReactComponent as Logo } from "../../assets/icons/logo-header.svg";
import LocalSelector from "../../shared/Buttons/LocalSelector";
import { UserRole } from "../../api/graphql/generated/graphql";

const Header: React.FC<IHeader> = ({ userRoles }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  const pages = [
    ...(userRoles.includes(UserRole.Student)
      ? [
          {
            title: (
              <Link style={style.link} to="/">
                {t("page.home")}
              </Link>
            ),
            pageURL: "/",
          },
        ]
      : []),
    ...(userRoles.some((role) =>
      [UserRole.Mentor, UserRole.Master, UserRole.Master].includes(role!)
    )
      ? [
          {
            title: (
              <Link style={style.link} to="/kanban">
                Доска заданий
              </Link>
            ),
            pageURL: "/kanban",
          },
        ]
      : []),
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
