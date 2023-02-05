import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
import React from "react";
import { TextFieldStyled } from "./InputTextField.styled";

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
