import { InMemoryCache, makeVar } from "@apollo/client";

import { initialSettings, themeSettingsTypes } from "theme";
import { THEMES } from "theme/constans";
import { Maybe, UserRole } from "api/graphql/generated/graphql";

export const userIdVar = makeVar<Maybe<string>>(null);
export const userRolesVar = makeVar<Maybe<Maybe<UserRole>[]>>([]);
export const commentVar = makeVar<Maybe<string | undefined>>(null);
export const settingsVar = makeVar<themeSettingsTypes>(initialSettings);
export const lightThemeVar = makeVar<boolean>(
  initialSettings.theme === THEMES.LIGHT
);

export const cache = new InMemoryCache();
