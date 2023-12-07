import { FC, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { IMenuBurger } from "./menu-burger.types";
import { StyledBox } from "./menu-burger.styled";

const MenuBurger: FC<IMenuBurger> = (props) => {
  const { setAnchorElNav, handleClickNavMenu, anchorElNav, pages } = props;

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseMenuBurger = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledBox>
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
          const { pageURL, title, id } = page;

          return (
            <MenuItem key={id} onClick={() => handleClickNavMenu(pageURL)}>
              <Typography textAlign="center">{title}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </StyledBox>
  );
};

export default MenuBurger;
