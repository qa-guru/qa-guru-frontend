import { useEffect, useState } from "react";
import { themeSettingsTypes } from "../theme";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    const getData = window.localStorage.getItem(key);
    if (getData) {
      setData(JSON.parse(getData));
    }
  }, [key]);

  const storeData = (updateValue: T | themeSettingsTypes) => {
    setData(updateValue as T);
    window.localStorage.setItem(key, JSON.stringify(updateValue));
  };

  return { data, storeData };
};

export default useLocalStorage;