import { FC } from "react";
import { Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { t } from "i18next";
import LocalSelector from "shared/components/local-selector/local-selector";

import {
  StyledLoadingButton,
  StyledLocalSelectorWrapper,
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
        token: yup.string().required(t("token.required")),
      })
    ),
  });

  const onSubmit = (data: IConfirmTokenForm) => {
    confirmToken(data.token);
  };

  return (
    <StyledWrapper>
      <StyledLocalSelectorWrapper>
        <LocalSelector />
      </StyledLocalSelectorWrapper>
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
