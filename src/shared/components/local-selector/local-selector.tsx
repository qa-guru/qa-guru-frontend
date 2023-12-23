import { FC } from "react";
import { useTranslation } from "react-i18next";
import { type SelectChangeEvent } from "@mui/material/Select";
import { ReactComponent as RussiaIcon } from "assets/icons/russia.svg";
import { ReactComponent as EnglishIcon } from "assets/icons/english.svg";
import { ListItemIcon, ListItemText } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

import {
  StyledFormControl,
  StyledMenuItem,
  StyledSelect,
} from "./local-selector.styled";

interface ILocaleSelector {
  isLogging?: boolean;
}

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

const LocaleSelector: FC<ILocaleSelector> = ({ isLogging }) => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    i18n.changeLanguage(value as string);
  };

  const renderValue = (value: unknown) => {
    return isLogging ? null : (value as string).toUpperCase();
  };

  return (
    <StyledFormControl variant="standard" size="small">
      <StyledSelect
        labelId="language-selector-label"
        value={i18n.language}
        onChange={handleChange}
        label="Language"
        IconComponent={isLogging ? LanguageIcon : undefined}
        renderValue={renderValue}
        MenuProps={{
          style: {
            marginTop: "26px",
          },
          PaperProps: {
            style: {
              borderRadius: "4px",
            },
          },
        }}
      >
        {languageOptions.map((option, index) => (
          <StyledMenuItem key={index} value={option.value}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText secondary={option.title} />
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default LocaleSelector;
