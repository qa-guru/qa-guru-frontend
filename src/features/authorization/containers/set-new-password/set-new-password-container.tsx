import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useSetPasswordMutation } from "api/graphql/generated/graphql";

import SetNewPassword from "../../views/set-new-password";

const SetNewPasswordContainer: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const token = new URLSearchParams(location.search).get("token");
  const [setPassword, { loading }] = useSetPasswordMutation();

  const handlePasswordSet = async (newPassword: string) => {
    try {
      if (token) {
        const response = await setPassword({
          variables: { token, newPassword },
        });
        if (response.data) {
          navigate("/authorization");
        } else {
          enqueueSnackbar("Ошибка при установке нового пароля");
        }
      } else {
        enqueueSnackbar("Токен не найден");
      }
    } catch (error) {
      enqueueSnackbar("Произошла ошибка. Пожалуйста, попробуйте снова");
    }
  };

  return <SetNewPassword onSet={handlePasswordSet} loading={loading} />;
};

export default SetNewPasswordContainer;
