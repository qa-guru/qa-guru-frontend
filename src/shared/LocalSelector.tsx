import React from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, SvgIcon } from "@mui/material";
import { ReactComponent as EnglishIcon } from "../icons/english.svg";
import { ReactComponent as RussiaIcon } from "../icons/russia.svg";

const LocalSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <IconButton onClick={() => changeLanguage("en")}>
        <SvgIcon>
          <EnglishIcon />
        </SvgIcon>
      </IconButton>
      <IconButton onClick={() => changeLanguage("ru")}>
        <SvgIcon>
          <RussiaIcon />
        </SvgIcon>
      </IconButton>
    </Box>
  );
};

export default LocalSelector;
