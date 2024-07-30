import { createContext, ReactNode, useMemo } from "react";
import { createCustomTheme, themeSettingsTypes } from "theme";
import { ThemeProvider } from "@mui/material";

import { useLocalStorage } from "shared/hooks";

import { THEMES } from "../../theme/constans";

const initialSettings: themeSettingsTypes = {
  theme: THEMES.LIGHT,
  responsiveFontSizes: true,
};

export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: (arg: themeSettingsTypes) => {},
  toggleTheme: () => {},
});

type SettingsProviderProps = {
  children: ReactNode;
};

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { data: settings, storeData: setStoreSettings } = useLocalStorage(
    "settings",
    initialSettings
  );

  const theme = useMemo(
    () =>
      createCustomTheme({
        theme: settings.theme,
        responsiveFontSizes: settings.responsiveFontSizes,
      }),
    [settings.theme, settings.responsiveFontSizes]
  );

  const saveSettings = (updateSettings: themeSettingsTypes) => {
    setStoreSettings(updateSettings);
  };

  const toggleTheme = () => {
    const newTheme =
      settings.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    saveSettings({ ...settings, theme: newTheme });
  };

  return (
    <ThemeProvider theme={theme}>
      <SettingsContext.Provider value={{ settings, saveSettings, toggleTheme }}>
        {children}
      </SettingsContext.Provider>
    </ThemeProvider>
  );
};

export default SettingsProvider;
