import { FC, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { ArrowDropDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { type Theme } from "@mui/material/styles"; // Ensure you have imported the Theme type

import { IKanbanMenu } from "./kanban-menu.types";
import {
  StyledButton,
  StyledMenu,
  StyledWrapperBox,
} from "./kanban-menu.styled";
import { StyledStack } from "../menu-burger/menu-burger.styled";

const KanbanMenu: FC<IKanbanMenu> = (props) => {
  const navigate = useNavigate();
  const { pages } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  let timeoutId: NodeJS.Timeout | null = null;

  const handleClose = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setAnchorEl(null);
    }, 0);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleClickNavMenu = (pageURL: string) => {
    handleClose();
    navigate(pageURL);
  };

  return (
    <StyledWrapperBox>
      <StyledButton
        sx={{
          zIndex: (theme: Theme) => theme.zIndex.modal + 1,
        }}
        onClick={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <StyledStack>
          <Typography textTransform="uppercase" variant="body2" color="primary">
            Доска заданий
          </Typography>
          <ArrowDropDown fontSize="small" color="primary" />
        </StyledStack>
      </StyledButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        MenuListProps={{
          onMouseLeave: handleMenuClose,
          onMouseEnter: handleMenuEnter,
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

export default KanbanMenu;
