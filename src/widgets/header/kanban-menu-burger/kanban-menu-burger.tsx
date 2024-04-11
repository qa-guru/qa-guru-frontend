import { FC, MouseEvent } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { ArrowDropDown } from "@mui/icons-material";
import { Button } from "@mui/material";

import { IMenuBurger } from "./kanban-menu-burger.types";
import { StyledMenu, StyledWrapperBox } from "./kanban-menu-burger.styled";
import { StyledStack } from "../menu-burger/menu-burger.styled";

const KanbanMenuBurger: FC<IMenuBurger> = (props) => {
  const { setAnchorElNav, handleClickNavMenu, anchorElNav, pages } = props;

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseMenuBurger = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledWrapperBox width="max-content">
      <Button onMouseEnter={handleOpenNavMenu}>
        <StyledStack onMouseLeave={handleCloseMenuBurger}>
          <Typography textTransform="uppercase" variant="body2" color="primary">
            Доска заданий
          </Typography>
          <ArrowDropDown fontSize="small" color="primary" />
        </StyledStack>
      </Button>
      <StyledMenu
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={handleCloseMenuBurger}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        MenuListProps={{
          onMouseLeave: handleCloseMenuBurger,
        }}
        disableAutoFocusItem
      >
        {pages.map((page) => {
          const { pageURL, title, id } = page;

          return (
            <MenuItem key={id} onClick={() => handleClickNavMenu(pageURL)}>
              <Typography
                textTransform="uppercase"
                textAlign="center"
                variant="body2"
              >
                {title}
              </Typography>
            </MenuItem>
          );
        })}
      </StyledMenu>
    </StyledWrapperBox>
  );
};

export default KanbanMenuBurger;
