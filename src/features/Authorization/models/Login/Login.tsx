import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import RHF from "../../../../shared/ui/InputRHF";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import LocalSelector from "../../../../shared/ui/LocaleSelector/LocalSelector";
import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Login.module.scss";

export interface ILoginForm {
  password: string;
  username: string;
}

const Login = () => {
  const { handleSubmit, control } = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const doLogin: SubmitHandler<ILoginForm> = async (data) => {
    try {
      setIsLoading(true);
      const response = await login(data.password, data.username);
      switch (response.status) {
        case 200:
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          enqueueSnackbar(t("login.unknownError"));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.data.status) {
          case 401:
            setIsLoading(false);
            enqueueSnackbar(t("login.unauthorized"));
            break;
          default:
            setIsLoading(false);
            enqueueSnackbar(t("login.unknownError"));
        }
      }
    }
  };

  return (
    <form className={styles.login_form}>
      <Typography align="center" variant="h4" component="h4">
        QA Guru
      </Typography>
      <RHF.InputTextField
        control={control}
        name="username"
        placeholder={t("email")}
      />
      <RHF.InputTextField
        control={control}
        name="password"
        placeholder={t("password")}
      />
      <div className={styles.local}>
        <LocalSelector />
      </div>
      <Button
        onClick={handleSubmit(doLogin)}
        variant="contained"
        disabled={isLoading && true}
      >
        {isLoading && <CircularProgress size={20} />}
        {t("login")}
      </Button>
    </form>
  );
};

export default Login;
