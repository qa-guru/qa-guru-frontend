import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { IAppMenu } from "./Menu.types";

const style = {
  box: { display: { xs: "none", md: "block" }, ml: "52px" },
};

const AppMenu: React.FC<IAppMenu> = (props) => {
  const { handleClickNavMenu, pages } = props;

  return (
    <Box sx={style.box}>
      <Stack direction="row" spacing={3}>
        {pages.map((page, index) => {
          const { pageURL, title } = page;

          return (
            <Button
              variant="text"
              key={index}
              onClick={() => handleClickNavMenu(pageURL)}
            >
              <Typography variant="subtitle2">{title}</Typography>
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default AppMenu;
