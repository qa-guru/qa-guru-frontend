import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useResetPasswordMutation } from "api/graphql/generated/graphql";

import ResetPassword from "../../views/reset-password";

const ResetPasswordContainer: FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [resetPassword, { loading }] = useResetPasswordMutation();

  const handlePasswordReset = async (email: string) => {
    try {
      const response = await resetPassword({ variables: { email } });
      if (response.data) {
        navigate("/reset/message");
      } else {
        enqueueSnackbar(
          "Ошибка при отправке письма. Пожалуйста, попробуйте снова"
        );
      }
    } catch (error) {
      enqueueSnackbar("Произошла ошибка. Пожалуйста, попробуйте снова");
    }
  };

  return <ResetPassword onReset={handlePasswordReset} loading={loading} />;
};

export default ResetPasswordContainer;
