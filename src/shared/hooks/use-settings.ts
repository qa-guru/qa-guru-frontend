import { useContext } from "react";
import { SettingsContext } from "shared/context/setting-context";

const useSettings = () => useContext(SettingsContext);

export default useSettings;
