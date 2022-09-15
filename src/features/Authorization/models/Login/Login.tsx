import { useCallback, useState, useEffect } from "react";
import { Form, notification } from "antd";
import axios from "axios";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import styles from "./Login.module.scss";
import UserName from "../../ui/UserName/UserName";
import Password from "../../ui/Password/Password";
import LoginButton from "../../ui/LoginButton/LoginButton";
import LoginLocaleSelector from "../../ui/LoginLocaleSelector/LoginLocaleSelector";
import { useAuthStore } from "../../context/AuthContext";

const Login = () => {
  const intl = useIntl();
  const authStore = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [performingLoginRequest, setPerformingLoginRequest] = useState(false);

  const doLogin = useCallback(async () => {
    setPerformingLoginRequest(true);
    try {
      const response = await authStore.login(username, password);
      switch (response.status) {
        case 200:
          break;
        default:
          notification.error({
            message: intl.formatMessage({ id: "auth.login.unknownError" }),
          });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.data.status) {
          case 401:
            notification.error({
              message: intl.formatMessage({ id: "auth.login.unauthorized" }),
            });
            break;
          default:
            notification.error({
              message: intl.formatMessage({ id: "auth.login.unknownError" }),
            });
        }
      }
    }
    setPerformingLoginRequest(false);
  }, [authStore, username, password, intl]);

  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <div className={styles.title}>QA Guru</div>
        <Form layout="vertical" onFinish={doLogin}>
          <UserName username={username} setUsername={setUsername} />
          <Password password={password} setPassword={setPassword} />
          <LoginLocaleSelector />
          <LoginButton performingLoginRequest={performingLoginRequest} />
        </Form>
      </div>
    </div>
  );
};

export default observer(Login);
