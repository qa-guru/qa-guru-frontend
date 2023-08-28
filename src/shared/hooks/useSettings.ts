import { useContext } from "react";
import { SettingsContext } from "../context/SettingContext";

const useSettings = () => useContext(SettingsContext);

export default useSettings;
