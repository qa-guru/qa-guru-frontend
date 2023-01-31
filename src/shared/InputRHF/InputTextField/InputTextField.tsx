import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    "& .MuiInputBase-input": {
      padding: "12.5px 14px",
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.9rem",
    },
  },
}));

const InputTextField: React.FC<IFormInputProps> = ({
  control,
  name,
  placeholder,
  label,
  type,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextFieldStyled
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          type={type}
        />
      )}
    />
  );
};

export default InputTextField;
