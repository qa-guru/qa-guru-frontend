import { Form } from "antd";
import { LocaleSelector } from "../../../../i18n/localeSelector/LocaleSelector";
import styles from "./LoginLocaleSelector.module.scss";

const LoginLocaleSelector = () => {
  return (
    <Form.Item>
      <div className={styles.language_switcher_container}>
        <LocaleSelector />
      </div>
    </Form.Item>
  );
};

export default LoginLocaleSelector;
