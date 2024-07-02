import { FC, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemText } from "@mui/material";
import CustomLink from "shared/components/custom-link";

import { IMenuBurger } from "./menu-burger.types";
import { StyledBox, StyledMenu } from "./menu-burger.styled";

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
      <IconButton size="large" color="primary" onClick={handleOpenNavMenu}>
        <MenuIcon />
      </IconButton>
      <StyledMenu
        keepMounted
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={handleCloseMenuBurger}
      >
        {pages.map((page) => {
          const { pageURL, title, id } = page;

          return (
            <CustomLink path={pageURL}>
              <MenuItem key={id} onClick={() => handleClickNavMenu(pageURL)}>
                <ListItemText>{title}</ListItemText>
              </MenuItem>
            </CustomLink>
          );
        })}
      </StyledMenu>
    </StyledBox>
  );
};

export default MenuBurger;
