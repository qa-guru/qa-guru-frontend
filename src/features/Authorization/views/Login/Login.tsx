import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
  SvgIcon,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ILogin, ILoginForm } from "./Login.types";
import RHF from "../../../../shared/InputRHF";
import LocalSelector from "../../../../shared/Buttons/LocalSelector";
import { ReactComponent as Logo } from "../../../../assets/icons/logo.svg";
import { primary, purple } from "../../../../theme/colors";

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
  button: {
    textTransform: "none",
    color: primary.main,
  },
  btn: { textTransform: "none" },
};

const Login: React.FC<ILogin> = (props) => {
  const { isLoading, login } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const routeRegister = () => {
    navigate("/register");
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required(t("email.required")!),
        password: yup.string().required(t("password.required")!),
      })
    ),
  });

  const doLogin: SubmitHandler<ILoginForm> = async (data) => {
    await login(data.username, data.password);
    navigate("/");
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(doLogin)();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Stack justifyContent="center" alignItems="center" sx={style.wrapper}>
      <SvgIcon sx={style.svgIcon} viewBox="0 0 250 38">
        <Logo />
      </SvgIcon>

      <Paper sx={style.paper}>
        <form>
          <Stack sx={style.stack} spacing={{ xs: 1, md: 2 }}>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="username"
                placeholder={t("enter.email")}
                label="E-mail"
              />
              {errors?.username && (
                <FormHelperText error>
                  {errors?.username.message}
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
            <LocalSelector />
            <LoadingButton
              sx={style.btn}
              onClick={handleSubmit(doLogin)}
              loading={isLoading}
              variant="contained"
            >
              {t("login")}
            </LoadingButton>
          </Stack>
        </form>
        <Box textAlign="center">
          <Button sx={style.button} variant="text">
            {t("restore")}
          </Button>
        </Box>
        <Box textAlign="center">
          <Button sx={style.button} variant="text" onClick={routeRegister}>
            {t("reg.route")}
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Login;
