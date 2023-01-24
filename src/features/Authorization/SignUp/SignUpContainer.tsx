import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserCreateInput } from "../../../generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../../../hooks/useAuth";
import SignUp from "./SignUp";

const SignUpContainer: React.FC = () => {
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
  const [valueConfirmPassword, setValueConfirmPassword] = useState<string>("");

  const onSubmit: SubmitHandler<UserCreateInput> = (data) => {
    valueConfirmPassword === getValues("password") && signup(data);
  };
  return (
    <SignUp
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      setValueConfirmPassword={setValueConfirmPassword}
      onSubmit={onSubmit}
      valueConfirmPassword={valueConfirmPassword}
      getValues={getValues}
      t={t}
    />
  );
};

export default SignUpContainer;
