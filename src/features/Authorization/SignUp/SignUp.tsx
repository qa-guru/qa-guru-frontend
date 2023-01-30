import React from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import RHF from "../../../shared/InputRHF";
import LocalSelector from "../../../shared/LocalSelector";
import { ISignUp } from "./SignUp.types";

const SignUp: React.FC<ISignUp> = (props) => {
  const {
    onSubmit,
    setValueConfirmPassword,
    errors,
    control,
    handleSubmit,
    valueConfirmPassword,
    getValues,
    t,
  } = props;

  return (
    <form>
      <Stack
        sx={{ padding: { xs: "16px 30px 10px", md: "32px 60px 20px" } }}
        spacing={2}
      >
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
          <RHF.InputPhone control={control} name="phoneNumber" />
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
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {t("registration")}
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;
