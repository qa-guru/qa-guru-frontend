import { FC } from "react";
import { useCheckResetPasswordTokenLazyQuery } from "api/graphql/generated/graphql";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import ConfirmToken from "../../views/confirm-token";

const ConfirmTokenContainer: FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [checkToken, { loading }] = useCheckResetPasswordTokenLazyQuery();

  const handleTokenSubmit = async (token: string) => {
    try {
      const response = await checkToken({ variables: { token } });
      if (response.data) {
        navigate(`/reset/password?token=${encodeURIComponent(token)}`);
      } else {
        enqueueSnackbar("Неверный токен");
      }
    } catch (error) {
      enqueueSnackbar(
        "Произошла ошибка при проверке токена. Пожалуйста, попробуйте снова"
      );
    }
  };

  return (
    <ConfirmToken onTokenConfirmation={handleTokenSubmit} loading={loading} />
  );
};

export default ConfirmTokenContainer;
