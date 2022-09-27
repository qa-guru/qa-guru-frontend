import { useState } from "react";
import { Form } from "antd";
import { observer } from "mobx-react";
import UserName from "../../ui/UserName/UserName";
import Password from "../../ui/Password/Password";
import styles from "./SignUp.module.scss";
import SignUpButton from "../../ui/SignUpButton/SignUpButton";
import useAuth from "../../../../hooks/useAuth";
import { LocaleSelector } from "../../../../i18n/localeSelector/LocaleSelector";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  const onSubmit = async () => {
    await signup(password, username);
  };

  return (
    <div className={styles.login_form}>
      <div className={styles.title}>QA Guru</div>
      <Form layout="vertical">
        <Form.Item>
          <UserName username={username} setUsername={setUsername} />
        </Form.Item>
        <Form.Item>
          <Password password={password} setPassword={setPassword} />
        </Form.Item>
        <Form.Item>
          <div className={styles.language_switcher_container}>
            <LocaleSelector />
          </div>
        </Form.Item>
        <Form.Item>
          <SignUpButton onSubmit={onSubmit} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(SignUp);
