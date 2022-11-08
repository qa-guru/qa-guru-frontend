import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
import React from "react";
import { FormLabel, TextField } from "@mui/material";
import styles from "./InputTextField.scss";

const InputTextField: React.FC<IFormInputProps> = ({
  control,
  name,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default InputTextField;
