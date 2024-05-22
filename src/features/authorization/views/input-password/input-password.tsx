import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { FormControl, InputAdornment, TextField, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  StyledFormHelperText,
  StyledIconButton,
} from "./input-password.styled";
import { IInputPassword } from "./input-password.types";

const InputPassword = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  errors,
  InputLabelProps,
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
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            label={label}
            placeholder={placeholder}
            autoComplete="current-password"
            InputLabelProps={InputLabelProps}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <StyledIconButton onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <Tooltip title="Скрыть пароль">
                        <VisibilityOff fontSize="small" color="primary" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Показать пароль">
                        <Visibility fontSize="small" color="primary" />
                      </Tooltip>
                    )}
                  </StyledIconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {errors?.[name] && (
        <StyledFormHelperText>{errors[name].message}</StyledFormHelperText>
      )}
    </FormControl>
  );
};

export default InputPassword;
