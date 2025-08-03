import { themeSettingsTypes } from "theme";

export const useLocalStorage = (
  key: string,
  initialValue: themeSettingsTypes
) => {
  const storeData = (updateValue: themeSettingsTypes) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(updateValue));
    } catch (error) {
      // Silent fail
    }
  };

  return { storeData };
};
