import { FC } from "react";
import { FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import RHF from "shared/components/input-RHF";
import { useNavigate } from "react-router-dom";
import {
  StyledLogo,
  StyledPaper,
  StyledResetButton,
  StyledStack,
  StyledWrapper,
} from "./set-new-password.styled";
import { ISetNewPassword } from "./set-new-password.types";

const SetNewPassword: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const routeLogin = () => {
    navigate("/authorization");
  };

  const {
    control,
    formState: { errors },
  } = useForm<ISetNewPassword>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledPaper>
        <form>
          <StyledStack>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="username"
                placeholder={t("enter.email")}
                label="E-mail"
              />
            </FormControl>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="password"
                placeholder={t("enter.password")}
                label={t("password")}
                type="password"
              />
            </FormControl>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="password"
                placeholder={t("password.confirm")}
                label={t("password")}
                type="password"
              />
            </FormControl>
            <StyledResetButton variant="contained" onClick={routeLogin}>
              Сохранить
            </StyledResetButton>
          </StyledStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default SetNewPassword;
