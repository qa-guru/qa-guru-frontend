import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import { ILoginButton } from "./LoginButton.types";

const LoginButton: React.FC<ILoginButton> = ({ performingLoginRequest }) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      size="large"
      block={true}
      loading={performingLoginRequest}
    >
      <FormattedMessage id="auth.login.submit" />
    </Button>
  );
};

export default LoginButton;
