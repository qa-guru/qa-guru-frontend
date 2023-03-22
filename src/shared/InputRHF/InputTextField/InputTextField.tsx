import { Controller } from "react-hook-form";
import React from "react";
import { TextField } from "@mui/material";
import { IFormInputProps } from "../Input.types";

const InputTextField: React.FC<IFormInputProps> = ({
  control,
  name,
  placeholder,
  label,
  type,
  multiline,
  maxRows,
  minRows,
  inputProps,
}) => {
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
