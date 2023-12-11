import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetPasswordMutation } from "api/graphql/generated/graphql"; // Предполагаемый импорт мутации
import { useSnackbar } from "notistack";

import SetNewPassword from "../../views/set-new-password";

const SetNewPasswordContainer: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const token = new URLSearchParams(location.search).get("token");

  const [setPassword, { loading }] = useSetPasswordMutation({
    onCompleted: () => {
      navigate("/authorization");
    },
    onError: (error) => {
      enqueueSnackbar(`Произошла ошибка: ${error.message}`);
    },
  });

  const handlePasswordSet = async (newPassword: string) => {
    if (token) {
      await setPassword({ variables: { token, newPassword } });
    } else {
      enqueueSnackbar("Токен не найден");
    }
  };

  return <SetNewPassword onSet={handlePasswordSet} loading={loading} />;
};

export default SetNewPasswordContainer;
