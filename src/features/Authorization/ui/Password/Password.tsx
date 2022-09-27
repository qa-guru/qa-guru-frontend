import { LockOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { IPassword } from "./Password.types";

const Password: React.FC<IPassword> = ({ password, setPassword }) => {
  return (
    <Input
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      prefix={<LockOutlined />}
      size="large"
    />
  );
};

export default Password;
