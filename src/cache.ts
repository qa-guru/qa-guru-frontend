import { InMemoryCache, makeVar } from "@apollo/client";

import { initialSettings, themeSettingsTypes } from "theme";
import { THEMES } from "theme/constans";
import { Maybe, UserRole } from "api/graphql/generated/graphql";

// Функция для загрузки настроек из localStorage
const loadSettingsFromStorage = (): themeSettingsTypes => {
  try {
    const storedSettings = window.localStorage.getItem("settings");
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      // Проверяем, что загруженные настройки валидны
      if (parsedSettings && typeof parsedSettings.theme === "string") {
        return parsedSettings;
      }
    }
  } catch (error) {
    // Silent fail - fallback to initial settings
  }
  return initialSettings;
};

export const userIdVar = makeVar<Maybe<string>>(null);
export const userRolesVar = makeVar<Maybe<Maybe<UserRole>[]>>([]);
export const commentVar = makeVar<Maybe<string | undefined>>(null);

// Инициализируем настройки из localStorage
const savedSettings = loadSettingsFromStorage();
export const settingsVar = makeVar<themeSettingsTypes>(savedSettings);
export const lightThemeVar = makeVar<boolean>(
  savedSettings.theme === THEMES.LIGHT
);

export const cache = new InMemoryCache();
