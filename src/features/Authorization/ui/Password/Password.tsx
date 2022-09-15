import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { IPassword } from "./Password.types";

const Password: React.FC<IPassword> = ({ password, setPassword }) => {
  return (
    <Form.Item>
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        prefix={<LockOutlined />}
        size="large"
      />
    </Form.Item>
  );
};

export default Password;
