import { FC } from "react";
import { Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";

import { InputText } from "shared/components/form";
import ThemeSelector from "shared/components/theme-selector";

import {
  StyledLoadingButton,
  StyledSelectorWrapper,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "../views.styled";
import { IConfirmToken, IConfirmTokenForm } from "./confirm-token.types";

const ConfirmToken: FC<IConfirmToken> = ({ confirmToken, isLoading }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IConfirmTokenForm>({
    defaultValues: {
      token: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        token: yup.string().required("Введите токен").trim(),
      })
    ),
  });

  const onSubmit = (data: IConfirmTokenForm) => {
    confirmToken(data.token);
  };

  return (
    <StyledWrapper>
      <StyledSelectorWrapper>
        <ThemeSelector />
      </StyledSelectorWrapper>
      <StyledLogo />
      <StyledPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledStack>
            <Typography>
              На ваш E-mail был отправлен токен для сброса пароля
            </Typography>
            <InputText
              control={control}
              name="token"
              placeholder={"Введите токен"}
              type="password"
              label="Токен"
              errors={errors}
            />
            <StyledLoadingButton
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              Ok
            </StyledLoadingButton>
          </StyledStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default ConfirmToken;
