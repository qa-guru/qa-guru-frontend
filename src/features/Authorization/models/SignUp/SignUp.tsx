import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import RHF from "../../../../shared/ui/InputRHF";
import LocalSelector from "../../../../shared/ui/LocaleSelector/LocalSelector";
import { UserCreateInput } from "../../../../generated/graphql";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignUp = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<UserCreateInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required(t("firstName.required")!),
        lastName: yup.string().required(t("lastName.required")!),
        email: yup.string().required(t("email.required")!),
        password: yup
          .string()
          .min(8, t("password.required.min")!)
          .max(15, t("password.required.max")!)
          .required(t("password.required")!),
        phoneNumber: yup.string().required(t("phone.required")!),
      })
    ),
  });
  const { signup } = useAuth();
  const [valueConfirmPassword, setValueConfirmPassword] = useState<any>("");

  const onSubmit: SubmitHandler<UserCreateInput> = async (data) => {
    valueConfirmPassword === getValues("password") && (await signup(data));
  };

  return (
    <Stack
      sx={{ padding: { xs: "16px 30px 10px", md: "32px 60px 20px" } }}
      spacing={2}
    >
      <FormControl fullWidth>
        <RHF.InputTextField
          control={control}
          name="firstName"
          placeholder="Введите ваше имя"
          label={t("firstName")!}
        />
        {errors?.firstName && (
          <FormHelperText error>{errors?.firstName.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <RHF.InputTextField
          control={control}
          name="lastName"
          placeholder="Введите фамилию"
          label={t("lastName")!}
        />
        {errors?.lastName && (
          <FormHelperText error>{errors?.lastName.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <RHF.InputTextField
          control={control}
          name="email"
          placeholder={t("enter.email")}
          label="E-mail"
        />
        {errors?.email && (
          <FormHelperText error>{errors?.email.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <RHF.InputPhone control={control} name="phoneNumber" />
        {errors?.phoneNumber && (
          <FormHelperText error>{errors?.phoneNumber.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <RHF.InputTextField
          control={control}
          name="password"
          placeholder={t("enter.password")}
          label={t("password")!}
        />
        {errors?.password && (
          <FormHelperText error>{errors?.password.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <TextField
          name="password"
          placeholder={t("enter.password")!}
          label={t("password.confirm")!}
          onChange={(e) => setValueConfirmPassword(e.target.value)}
        />
        {valueConfirmPassword !== getValues("password") && (
          <FormHelperText error>Пароли не совпадают</FormHelperText>
        )}
      </FormControl>
      <LocalSelector />
      <Button onClick={handleSubmit(onSubmit)} variant="contained">
        {t("registration")}
      </Button>
    </Stack>
  );
};

export default SignUp;
