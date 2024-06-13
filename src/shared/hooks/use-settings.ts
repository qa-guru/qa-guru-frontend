import { useContext } from "react";
import { SettingsContext } from "shared/context/setting-context";

export const useSettings = () => useContext(SettingsContext);
