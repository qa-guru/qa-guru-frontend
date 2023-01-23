import React from "react";
import RHF from "../../../shared/InputRHF";
import LocalSelector from "../../../shared/LocalSelector";
import { Button, FormControl, FormHelperText, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ILogin } from "./Login.types";

const Login: React.FC<ILogin> = (props) => {
  const { handleSubmit, control, errors, isLoading, doLogin, t } = props;

  return (
    <Stack
      sx={{ padding: { xs: "16px 30px 10px", md: "32px 60px 20px" } }}
      spacing={2}
    >
      <FormControl fullWidth>
        <RHF.InputTextField
          control={control}
          name="username"
          placeholder={t("enter.email")}
          label="E-mail"
        />
        {errors?.username && (
          <FormHelperText error>{errors?.username.message}</FormHelperText>
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
      <LocalSelector />
      <Button
        onClick={handleSubmit(doLogin)}
        variant="contained"
        disabled={isLoading && true}
      >
        {isLoading && <CircularProgress size={20} />}
        {t("login")}
      </Button>
    </Stack>
  );
};

export default Login;
