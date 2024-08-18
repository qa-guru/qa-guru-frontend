import { useEffect, useState } from "react";

import { themeSettingsTypes } from "theme";

export const useLocalStorage = (
  key: string,
  initialValue: themeSettingsTypes
) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const getData = window.localStorage.getItem(key);
    if (getData) {
      setData(JSON.parse(getData));
    }
  }, [key]);

  const storeData = (updateValue: themeSettingsTypes) => {
    setData(updateValue);
    window.localStorage.setItem(key, JSON.stringify(updateValue));
  };

  return { data, storeData };
};
