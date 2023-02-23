import React from "react";
import { FormControl, FormHelperText, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { ILogin, ILoginForm } from "./Login.types";
import RHF from "../../../shared/InputRHF";
import LocalSelector from "../../../shared/LocalSelector";

const style = {
  stack: {
    padding: { xs: "16px 30px 10px", md: "32px 60px 20px" },
  },
};

const Login: React.FC<ILogin> = (props) => {
  const { isLoading, login } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required(t("email.required")!),
        password: yup.string().required(t("password.required")!),
      })
    ),
  });

  const doLogin: SubmitHandler<ILoginForm> = async (data) => {
    await login(data.username, data.password);
  };

  return (
    <form>
      <Stack sx={style.stack} spacing={{ xs: 1, md: 2 }}>
        <FormControl fullWidth>
          <RHF.InputTextField
            control={control}
            name="username"
            placeholder={t("enter.email")}
            label="E-mail"
          />
          {errors?.username && (
            <FormHelperText error>{errors?.username.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <RHF.InputTextField
            control={control}
            name="password"
            placeholder={t("enter.password")}
            label={t("password")!}
            type="password"
          />
          {errors?.password && (
            <FormHelperText error>{errors?.password.message}</FormHelperText>
          )}
        </FormControl>
        <LocalSelector />
        <LoadingButton
          onClick={handleSubmit(doLogin)}
          loading={isLoading}
          variant="contained"
        >
          {t("login")}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Login;
