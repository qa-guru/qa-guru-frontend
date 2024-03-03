import { Controller, FieldValues } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";

import { IFormInputText } from "./input-text.types";
import { StyledFormHelperText } from "./input-text.styled";

const InputText = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  type,
  multiline,
  maxRows,
  minRows,
  inputProps,
  InputProps,
  autoComplete,
  onKeyDown,
  errors,
}: IFormInputText<T>) => {
  return (
    <FormControl fullWidth error={Boolean(errors?.[name])}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            label={label}
            type={type}
            multiline={multiline}
            maxRows={maxRows}
            minRows={minRows}
            inputProps={inputProps}
            InputProps={InputProps}
            autoComplete={autoComplete}
            onKeyDown={onKeyDown}
          />
        )}
      />
      {errors?.[name] && (
        <StyledFormHelperText multiline={multiline}>
          {errors[name].message}
        </StyledFormHelperText>
      )}
    </FormControl>
  );
};

export default InputText;
