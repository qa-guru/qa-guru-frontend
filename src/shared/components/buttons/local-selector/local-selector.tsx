import * as React from "react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line import/named
import { SelectChangeEvent } from "@mui/material/Select";
import { ReactComponent as RussiaIcon } from "assets/icons/russia.svg";
import { ReactComponent as EnglishIcon } from "assets/icons/english.svg";
import { Typography } from "@mui/material";
import {
  StyledFormControl,
  StyledMenuItem,
  StyledSelect,
} from "../buttons.styled";

const LocaleSelector = () => {
  const { i18n } = useTranslation();
  const languageOptions = [
    {
      title: "English",
      value: "en",
      icon: <EnglishIcon />,
    },

    {
      title: "Русский",
      value: "ru",
      icon: <RussiaIcon />,
    },
  ];

  const handleChange = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => {
    const value = event.target.value as string;
    i18n.changeLanguage(value);
  };

  return (
    <StyledFormControl variant="standard" size="small">
      <StyledSelect
        labelId="language-selector-label"
        value={i18n.language}
        onChange={handleChange}
        label="Language"
        renderValue={(value) => (value as string).toUpperCase()}
        MenuProps={{
          style: {
            marginTop: "20px",
          },
        }}
      >
        {languageOptions.map((option) => (
          <StyledMenuItem key={option.value} value={option.value}>
            {option.icon}
            <Typography variant="caption">{option.title}</Typography>
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default LocaleSelector;
