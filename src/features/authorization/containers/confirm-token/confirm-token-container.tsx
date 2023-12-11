import { FC } from "react";
import { useCheckResetPasswordTokenLazyQuery } from "api/graphql/generated/graphql";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import ConfirmToken from "../../views/confirm-token";

const ConfirmTokenContainer: FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [checkToken, { loading }] = useCheckResetPasswordTokenLazyQuery({
    onCompleted: (data) => {
      if (data) {
        navigate("/reset/password");
      }
    },
    onError: () => {
      enqueueSnackbar("Неверный токен");
    },
  });

  const handleTokenSubmit = async (token: string) => {
    await checkToken({ variables: { token } });
    navigate(`/reset/password?token=${encodeURIComponent(token)}`);
  };

  return (
    <ConfirmToken onTokenConfirmation={handleTokenSubmit} loading={loading} />
  );
};

export default ConfirmTokenContainer;
