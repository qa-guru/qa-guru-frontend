import React, { useState } from "react";
import { FormControl, FormHelperText, Stack } from "@mui/material";
import RHF from "../../../shared/InputRHF";
import LocalSelector from "../../../shared/LocalSelector";
import { ISignUp } from "./SignUp.types";
import { TextFieldStyled } from "../../../shared/InputRHF/InputTextField/InputTextField.styled";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserCreateInput } from "../../../generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  stack: {
    padding: { xs: "16px 30px 10px", md: "32px 60px 20px" },
  },
};

const SignUp: React.FC<ISignUp> = (props) => {
  const { signup, isLoading } = props;
  const { t } = useTranslation();
  const [valueConfirmPassword, setValueConfirmPassword] = useState<string>("");

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

  const onSubmit: SubmitHandler<UserCreateInput> = (data) => {
    valueConfirmPassword === getValues("password") && signup(data);
  };

  return (
    <form>
      <Stack sx={style.stack} spacing={{ xs: 1, md: 2 }}>
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
          <RHF.InputPhone
            control={control}
            name="phoneNumber"
            label="Phone"
            placeholder="(555) 555-5555"
          />
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
            type="password"
          />
          {errors?.password && (
            <FormHelperText error>{errors?.password.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <TextFieldStyled
            name="password"
            placeholder={t("enter.password")!}
            label={t("password.confirm")!}
            onChange={(e) => setValueConfirmPassword(e.target.value)}
            type="password"
          />
          {valueConfirmPassword !== getValues("password") && (
            <FormHelperText error>Пароли не совпадают</FormHelperText>
          )}
        </FormControl>
        <LocalSelector />
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
          variant="contained"
        >
          {t("registration")}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default SignUp;
