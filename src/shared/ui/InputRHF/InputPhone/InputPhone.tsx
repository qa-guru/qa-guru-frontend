import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const InputPhone: React.FC<IFormInputProps> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="RU"
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default InputPhone;
