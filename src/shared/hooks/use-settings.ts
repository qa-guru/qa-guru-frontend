import { useContext } from "react";
import { SettingsContext } from "../context/setting-context";

const useSettings = () => useContext(SettingsContext);

export default useSettings;
