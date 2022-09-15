import { Button, Form } from "antd";
import { FormattedMessage } from "react-intl";
import { ILoginButton } from "./LoginButton.types";

const LoginButton: React.FC<ILoginButton> = ({ performingLoginRequest }) => {
  return (
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block={true}
        loading={performingLoginRequest}
      >
        <FormattedMessage id="auth.login.submit" />
      </Button>
    </Form.Item>
  );
};

export default LoginButton;
