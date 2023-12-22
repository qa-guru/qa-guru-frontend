import { createTheme, responsiveFontSizes } from "@mui/material";
import merge from "lodash/merge";

import components from "./components";
import themesOptions from "./theme-options";
import { THEMES } from "./constans";
import "./fonts.css";

export type themeSettingsTypes = {
  theme: string;
  responsiveFontSizes?: boolean;
};

const baseOptions = {
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontSize: "2.125rem", // ~34px
    },
    h2: {
      fontSize: "1.5rem", // ~24px
    },
    h3: {
      fontSize: "1.29rem", // ~20px
    },
    h4: {
      fontSize: "1.1rem", // ~18px
    },
    h5: {
      fontSize: "1rem", // ~16px
    },
    h6: {
      fontSize: "0.875rem", // ~14px
    },
    body1: {
      fontSize: "0.9375rem", // ~15px
    },
    body2: {
      fontSize: "0.8rem", // ~14px
    },
    subtitle1: {
      fontSize: "0.9rem", // ~16px
    },
    subtitle2: {
      fontSize: "0.875rem", // ~14px
    },
    caption: {
      fontSize: "0.75rem", // ~12px
    },
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
