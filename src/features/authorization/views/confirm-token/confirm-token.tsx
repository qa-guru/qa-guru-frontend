import { FC } from "react";
import { Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";

import {
  StyledLogo,
  StyledPaper,
  StyledResetButton,
  StyledStack,
  StyledWrapper,
} from "./confirm-token.styled";
import { IConfirmToken, IConfirmTokenForm } from "./confirm-token.types";

const ConfirmToken: FC<IConfirmToken> = ({ onTokenConfirmation, loading }) => {
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
        token: yup.string().required(),
      })
    ),
  });

  const onSubmit = (data: IConfirmTokenForm) => {
    onTokenConfirmation(data.token);
  };

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledStack>
            <Typography>
              На ваш E-mail был отправлен уникальный токен для сброса пароля
            </Typography>
            <InputText
              control={control}
              name="token"
              placeholder={"Введите токен"}
              type="password"
              label="Токен"
              errors={errors}
            />
            <StyledResetButton
              type="submit"
              variant="contained"
              disabled={loading}
            >
              Ok
            </StyledResetButton>
          </StyledStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default ConfirmToken;
