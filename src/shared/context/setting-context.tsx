import { createContext, ReactNode, useCallback, useMemo } from "react";
import { themeSettingsTypes } from "theme";
import { THEMES } from "theme/constans";

import useLocalStorage from "../hooks/use-local-storage";

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

  const saveSettings = (updateSettings: themeSettingsTypes) => {
    setStoreSettings(updateSettings);
  };

  const toggleTheme = useCallback(() => {
    const newSettings = {
      ...settings,
      theme: settings.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
    };
    saveSettings(newSettings);
    console.log(settings.theme);
  }, [settings, saveSettings]);

  const contextValue = useMemo(
    () => ({
      settings,
      saveSettings,
      toggleTheme,
    }),
    [settings, saveSettings, toggleTheme]
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
