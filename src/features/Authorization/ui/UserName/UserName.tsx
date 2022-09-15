import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useCallback, ChangeEvent } from "react";
import { ILoginUserName } from "./UserName.types";

const LoginUserName: React.FC<ILoginUserName> = ({ setUsername, username }) => {
  const changeLogin = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    [setUsername]
  );

  return (
    <Form.Item>
      <Input
        id="input_login"
        placeholder="Login"
        onChange={changeLogin}
        value={username}
        prefix={<UserOutlined />}
        size="large"
      />
    </Form.Item>
  );
};

export default LoginUserName;
