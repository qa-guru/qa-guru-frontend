import { Controller, FieldValues } from "react-hook-form";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { IFormInputText } from "./input-text.types";

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
  errors,
}: IFormInputText<T>) => {
  return (
    <FormControl fullWidth error={Boolean(errors[name])}>
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
          />
        )}
      />
      {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
    </FormControl>
  );
};

export default InputText;
