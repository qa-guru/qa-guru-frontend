import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { ISignUp } from "./SignUp.types";
import RHF from "../../../shared/InputRHF";
import LocalSelector from "../../../shared/LocalSelector";
import { UserCreateInput } from "../../../api/graphql/generated/graphql";
import { primary, purple } from "../../../theme/colors";
import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";

const style = {
  svgIcon: { height: "38px", width: { xs: "170px", sm: "250px" } },
  paper: {
    minWidth: { xs: "none", md: "430px" },
    marginTop: { xs: "7px", md: "22px" },
  },
  stack: {
    padding: { xs: "16px 30px 10px", md: "32px 60px 20px" },
  },
  wrapper: { height: "100vh", bgcolor: purple.main },
  btn: { textTransform: "none" },
  button: { textTransform: "none", color: primary.main },
};

const SignUp: React.FC<ISignUp> = (props) => {
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
          .min(8, t("password.required.min")!)
          .max(15, t("password.required.max")!)
          .required(t("password.required")!),
        phoneNumber: yup.string().required(t("phone.required")!),
      })
    ),
  });

  const routeLogin = () => {
    navigate("/authorization");
  };

  const onSubmit: SubmitHandler<UserCreateInput> = (data) => {
    valueConfirmPassword === getValues("password") && signup(data);
  };

  return (
    <Stack sx={style.wrapper} justifyContent="center" alignItems="center">
      <SvgIcon sx={style.svgIcon} viewBox="0 0 250 38">
        <Logo />
      </SvgIcon>
      <Paper sx={style.paper}>
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
                <FormHelperText error>
                  {errors?.phoneNumber.message}
                </FormHelperText>
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
            <LoadingButton
              sx={style.btn}
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              variant="contained"
            >
              {t("registration")}
            </LoadingButton>
          </Stack>
        </form>
        <Box textAlign="center">
          <Button sx={style.button} variant="text" onClick={routeLogin}>
            {t("auth.route")}
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default SignUp;
