import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "api/graphql/generated/graphql";

import ResetPassword from "../../views/reset-password";

const ResetPasswordContainer: FC = (props) => {
  const navigate = useNavigate();

  const [resetPassword, { loading }] = useResetPasswordMutation({
    update: (cache, { data }) => {
      const resetPasswordData = data?.resetPassword;
      if (resetPasswordData?.success) {
        navigate("/reset/message");
      }
    },
  });

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword({
        variables: { email },
      });
      // Handle success - здесь уже обрабатывается уведомление об отправке письма
    } catch (e) {
      // Handle error - e.g., display an error message
    }
  };

  return (
    <ResetPassword onPasswordReset={handleResetPassword} loading={loading} />
  );
};

export default ResetPasswordContainer;
