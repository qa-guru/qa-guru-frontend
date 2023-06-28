import { createTheme, responsiveFontSizes } from "@mui/material";
import merge from "lodash/merge";
import components from "./components";
import themesOptions from "./themeOptions";
import { THEMES } from "./constans";
import "./fonts.css";

export type themeSettingsTypes = {
  theme: string;
  responsiveFontSizes?: boolean;
};

const baseOptions = {
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
};

export const createCustomTheme = (settings: themeSettingsTypes) => {
  let themeOptions: object = themesOptions[settings.theme];

  if (!themeOptions) {
    themeOptions = themesOptions[THEMES.LIGHT];
  }

  const mergedThemeOptions = merge({}, baseOptions, themeOptions);

  let theme = createTheme(mergedThemeOptions);

  theme.components = components(theme);
  if (settings.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
