import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import {
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { StyledFormHelperText } from "./input-password.styled";
import { IInputPassword } from "./input-password.types";

const InputPassword = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  errors,
}: IInputPassword<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl fullWidth error={Boolean(errors?.[name])}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const inputProps = {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <Tooltip title="Скрыть пароль">
                      <VisibilityOffIcon fontSize="small" color="primary" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Показать пароль">
                      <VisibilityIcon fontSize="small" color="primary" />
                    </Tooltip>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          };

          return (
            <TextField
              {...{ value, onChange, label, placeholder }}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              fullWidth
              InputProps={inputProps}
            />
          );
        }}
      />

      {errors?.[name] && (
        <StyledFormHelperText>{errors[name].message}</StyledFormHelperText>
      )}
    </FormControl>
  );
};

export default InputPassword;
