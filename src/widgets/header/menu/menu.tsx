import { FC } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { IAppMenu } from "./menu.types";
import { StyledBox, StyledStack } from "./menu.styled";

const AppMenu: FC<IAppMenu> = (props) => {
  const { handleClickNavMenu, pages } = props;

  return (
    <StyledBox>
      <StyledStack>
        {pages.map((page, index) => {
          const { pageURL, title } = page;

          return (
            <Button
              variant="text"
              key={index}
              onClick={() => handleClickNavMenu(pageURL)}
            >
              <Typography variant="body2">{title}</Typography>
            </Button>
          );
        })}
      </StyledStack>
    </StyledBox>
  );
};

export default AppMenu;
