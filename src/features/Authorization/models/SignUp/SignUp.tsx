import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import RHF from "../../../../shared/ui/InputRHF";
import LocalSelector from "../../../../shared/ui/LocaleSelector/LocalSelector";
import { useTranslation } from "react-i18next";
import styles from "./SignUp.module.scss";
import { UserCreateInput } from "../../../../generated/graphql";

const SignUp = () => {
  const { handleSubmit, control } = useForm<UserCreateInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signup } = useAuth();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<UserCreateInput> = async (data) => {
    await signup(data);
  };

  return (
    <div className={styles.login_form}>
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
      <Button onClick={handleSubmit(onSubmit)} variant="contained">
        {t("signup")}
      </Button>
    </div>
  );
};

export default SignUp;
