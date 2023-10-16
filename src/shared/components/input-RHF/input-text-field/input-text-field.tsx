import { Controller, FieldValues } from "react-hook-form";
import { TextField } from "@mui/material";
import { IFormInputProps } from "../input.types";

const InputTextField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  type,
  multiline,
  maxRows,
  minRows,
  inputProps,
}: IFormInputProps<T>) => {
  return (
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
  );
};

export default InputTextField;
