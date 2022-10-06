import React from "react";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import { ISignUpButton } from "./SignUpButton.types";

const SignUpButton: React.FC<ISignUpButton> = ({ onSubmit }) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      size="large"
      block={true}
      onClick={onSubmit}
    >
      <FormattedMessage id="auth.signup.submit" />
    </Button>
  );
};

export default SignUpButton;
