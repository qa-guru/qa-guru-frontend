import { useState } from "react";
import { Form } from "antd";
import { observer } from "mobx-react";
import UserName from "../../ui/UserName/UserName";
import Password from "../../ui/Password/Password";
import LoginLocaleSelector from "../../ui/LoginLocaleSelector/LoginLocaleSelector";
import styles from "./SignUp.module.scss";
import SignUpButton from "../../ui/SignUpButton/SignUpButton";
import useAuth from "../../../../hooks/useAuth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, login } = useAuth();

  const onSubmit = async () => {
    await signup(password, username);
    await login(username, password);
  };

  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <div className={styles.title}>QA Guru</div>
        <Form layout="vertical">
          <UserName username={username} setUsername={setUsername} />
          <Password password={password} setPassword={setPassword} />
          <LoginLocaleSelector />
          <SignUpButton onSubmit={onSubmit} />
        </Form>
      </div>
    </div>
  );
};

export default observer(SignUp);
