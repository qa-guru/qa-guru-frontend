import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useCallback, ChangeEvent } from "react";
import { ILoginUserName } from "./UserName.types";

const LoginUserName: React.FC<ILoginUserName> = ({ setUsername, username }) => {
  const changeLogin = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    [setUsername]
  );

  return (
    <Input
      id="input_login"
      placeholder="Login"
      onChange={changeLogin}
      value={username}
      prefix={<UserOutlined />}
      size="large"
    />
  );
};

export default LoginUserName;
