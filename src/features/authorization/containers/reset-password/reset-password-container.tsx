import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "api/graphql/generated/graphql";
import { useSnackbar } from "notistack";

import ResetPassword from "../../views/reset-password";

const ResetPasswordContainer: FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [resetPassword, { loading }] = useResetPasswordMutation({
    onCompleted: () => {
      navigate("/reset/message");
    },
    onError: (error) => {
      enqueueSnackbar(
        "Произошла ошибка при отправке письма. Пожалуйста, попробуйте снова"
      );
    },
  });

  const handlePasswordReset = async (email: string) => {
    await resetPassword({
      variables: { email },
    });
  };

  return <ResetPassword onReset={handlePasswordReset} loading={loading} />;
};

export default ResetPasswordContainer;
