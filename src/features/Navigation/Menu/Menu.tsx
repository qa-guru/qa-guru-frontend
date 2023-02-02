import { Button, Typography } from "@mui/material";
import { IMenu } from "./Menu.types";
import React from "react";

const AppMenu: React.FC<IMenu> = (props) => {
  const { handleMenuClick, pages } = props;

  return (
    <>
      {pages.map((page) => {
        const { title, pageURL } = page;
        return (
          <Button
            style={{ textTransform: "none" }}
            key={pageURL}
            onClick={() => handleMenuClick(pageURL)}
            variant="text"
          >
            <Typography sx={{ color: "black" }} variant="h4">
              {title}
            </Typography>
          </Button>
        );
      })}
    </>
  );
};

export default AppMenu;
