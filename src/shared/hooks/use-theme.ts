import { useReactiveVar } from "@apollo/client";

import { themeSettingsTypes } from "theme";
import { lightThemeVar, settingsVar } from "cache";
import { useLocalStorage } from "shared/hooks";
import { THEMES } from "theme/constans";

export const useSettings = () => {
  const settings = useReactiveVar(settingsVar);
  const { storeData: setStoreSettings } = useLocalStorage("settings", settings);

  const saveSettings = (updateSettings: themeSettingsTypes) => {
    settingsVar(updateSettings);
    lightThemeVar(updateSettings.theme === THEMES.LIGHT);
    setStoreSettings(updateSettings);
  };

  const toggleTheme = () => {
    const newTheme =
      settings.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    saveSettings({ ...settings, theme: newTheme });
  };

  return { settings, saveSettings, toggleTheme };
};
