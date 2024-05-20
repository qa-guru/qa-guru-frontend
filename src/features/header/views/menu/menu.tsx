import { FC } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { IAppMenu } from "./menu.types";
import { StyledBox, StyledStack } from "./menu.styled";
import { StyledLink } from "../header/header.styled";

const AppMenu: FC<IAppMenu> = (props) => {
  const { handleClickNavMenu, pages } = props;

  return (
    <StyledBox>
      <StyledStack>
        {pages.map((page) => {
          const { pageURL, title, id } = page;

          return (
            <StyledLink to={pageURL} key={id}>
              <Button
                variant="text"
                onClick={() => handleClickNavMenu(pageURL)}
                disableRipple
              >
                <Typography variant="body2">{title}</Typography>
              </Button>
            </StyledLink>
          );
        })}
      </StyledStack>
    </StyledBox>
  );
};

export default AppMenu;
