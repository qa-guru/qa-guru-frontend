import React from "react";
import { Button, Form } from "antd";
import { FormattedMessage } from "react-intl";
import { ISignUpButton } from "./SignUpButton.types";

const SignUpButton: React.FC<ISignUpButton> = ({ onSubmit }) => {
  return (
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block={true}
        onClick={onSubmit}
      >
        <FormattedMessage id="auth.signup.submit" />
      </Button>
    </Form.Item>
  );
};

export default SignUpButton;
