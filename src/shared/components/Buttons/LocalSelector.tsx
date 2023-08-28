import React from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, SvgIcon } from "@mui/material";
import { style } from "./styles";
import { ReactComponent as EnglishIcon } from "../../../assets/icons/english.svg";
import { ReactComponent as RussiaIcon } from "../../../assets/icons/russia.svg";

const LocalSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={style.box}>
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
