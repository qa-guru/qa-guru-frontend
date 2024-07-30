import { FC, Fragment } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import CustomLink from "shared/components/custom-link";

import { IAppMenu } from "./menu.types";
import { StyledBox, StyledStack } from "./menu.styled";
import KanbanMenu from "../kanban-menu";

const AppMenu: FC<IAppMenu> = (props) => {
  const { handleClickNavMenu, pages } = props;

  return (
    <StyledBox>
      <StyledStack>
        {pages?.map((page) => {
          const { pageURL, title, menuPages } = page;

          if (menuPages) {
            return <KanbanMenu key={title} pages={menuPages} />;
          }

          return (
            <Fragment key={pageURL}>
              <CustomLink path={pageURL}>
                <Button
                  variant="text"
                  onClick={() => handleClickNavMenu(pageURL)}
                  disableRipple
                >
                  <Typography variant="body2">{title}</Typography>
                </Button>
              </CustomLink>
            </Fragment>
          );
        })}
      </StyledStack>
    </StyledBox>
  );
};

export default AppMenu;
