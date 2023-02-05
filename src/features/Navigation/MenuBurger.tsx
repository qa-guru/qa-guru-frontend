import React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

interface IMenuBurger {
  setAnchorElNav: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleClickNavMenu: (pageURL: string) => void;
  anchorElNav: HTMLElement | null;
  pages: { pageURL: string; title: JSX.Element }[];
}

const style = {
  box: { display: { xs: "block", md: "none" } },
};

const MenuBurger: React.FC<IMenuBurger> = (props) => {
  const { setAnchorElNav, handleClickNavMenu, anchorElNav, pages } = props;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseMenuBurger = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={style.box}>
      <IconButton size="large" onClick={handleOpenNavMenu}>
        <MenuIcon />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={handleCloseMenuBurger}
      >
        {pages.map((page) => {
          const { pageURL, title } = page;

          return (
            <MenuItem
              key={page.pageURL}
              onClick={() => handleClickNavMenu(pageURL)}
            >
              <Typography textAlign="center">{title}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default MenuBurger;
