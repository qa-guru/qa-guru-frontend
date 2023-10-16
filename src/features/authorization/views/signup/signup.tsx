import React, { useEffect, useState } from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import RHF from "shared/components/input-RHF";
import LocalSelector from "shared/components/buttons/local-selector/local-selector";
import { UserCreateInput } from "api/graphql/generated/graphql";
import {
  StyledAlignBox,
  StyledButton,
  StyledLoadingButton,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "./signup.styled";
import { ISignUp } from "./signup.types";
import { REQUIRED_SYMBOLS } from "../../constants";

const Signup: React.FC<ISignUp> = (props) => {
  const { signup, isLoading } = props;
  const navigate = useNavigate();
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
          .min(REQUIRED_SYMBOLS.MIN, t("password.required.min")!)
          .max(REQUIRED_SYMBOLS.MAX, t("password.required.max")!)
          .required(t("password.required")!),
        phoneNumber: yup.string().required(t("phone.required")!),
      })
    ),
  });

  const routeLogin = () => {
    navigate("/authorization");
  };

  const passwordsMatch = valueConfirmPassword === getValues("password");

  const onSubmit: SubmitHandler<UserCreateInput> = (data) => {
    if (passwordsMatch) {
      signup(data);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledPaper>
        <form>
          <StyledStack>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="firstName"
                placeholder="Введите ваше имя"
                label={t("firstName")!}
              />
              {errors?.firstName && (
                <FormHelperText error>
                  {errors?.firstName.message}
                </FormHelperText>
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
                <FormHelperText error>
                  {errors?.lastName.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="email"
                placeholder={t("enter.email")!}
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
                <FormHelperText error>
                  {errors?.phoneNumber.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="password"
                placeholder={t("enter.password")!}
                label={t("password")!}
                type="password"
              />
              {errors?.password && (
                <FormHelperText error>
                  {errors?.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <TextField
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
            <StyledLoadingButton
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              variant="contained"
            >
              {t("registration")}
            </StyledLoadingButton>
          </StyledStack>
        </form>
        <StyledAlignBox>
          <StyledButton variant="text" onClick={routeLogin}>
            {t("auth.route")}
          </StyledButton>
        </StyledAlignBox>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default Signup;
