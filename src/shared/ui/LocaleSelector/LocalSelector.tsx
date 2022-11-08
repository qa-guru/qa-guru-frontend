import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

const LocalSelector = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => changeLanguage("en")}>
        {t("english")}
      </Button>
      <Button variant="outlined" onClick={() => changeLanguage("ru")}>
        {t("russian")}
      </Button>
    </>
  );
};

export default LocalSelector;
