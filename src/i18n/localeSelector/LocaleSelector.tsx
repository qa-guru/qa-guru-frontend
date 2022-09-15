import { useCallback } from "react";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { useI18nStore } from "@amplicode/react";
import { Select } from "antd";
import styles from "./LocaleSelector.module.scss";

export const LocaleSelector = observer(() => {
  const { localeConfigs, currentLocale, setCurrentLocale } = useI18nStore();
  const locales = Object.keys(localeConfigs);

  const handleChange = useCallback(
    (locale: string) => runInAction(() => setCurrentLocale(locale)),
    [setCurrentLocale]
  );

  if (locales.length === 1) {
    return null; // Do not show LocaleSelector if there is only a single locale option
  }

  return (
    <Select
      defaultValue={currentLocale ?? undefined}
      onChange={handleChange}
      size="small"
      className={styles.select}
      bordered={false}
      dropdownMatchSelectWidth={false}
    >
      {locales?.map((item: string) => (
        <Select.Option key={item} value={item}>
          {localeConfigs[item].caption}
        </Select.Option>
      ))}
    </Select>
  );
});
