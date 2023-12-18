import { useTranslation } from "react-i18next";
import { type SelectChangeEvent } from "@mui/material/Select";
import { ReactComponent as RussiaIcon } from "assets/icons/russia.svg";
import { ReactComponent as EnglishIcon } from "assets/icons/english.svg";
import { Typography } from "@mui/material";

import {
  StyledFormControl,
  StyledMenuItem,
  StyledSelect,
} from "./local-selector.styled";

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

const LocaleSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    i18n.changeLanguage(value as string);
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
        {languageOptions.map((option, index) => (
          <StyledMenuItem key={index} value={option.value}>
            {option.icon}
            <Typography variant="caption">{option.title}</Typography>
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default LocaleSelector;
