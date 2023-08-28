import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { IFormInputProps } from "../Input.types";

const InputSelect = <T extends FieldValues>({
  control,
  placeholder,
  name,
  options,
  defaultValue,
  onChange,
  disabled = false,
}: IFormInputProps<T>) => {
  return (
    <>
      <InputLabel>{placeholder}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange: handleChange } }) => (
          <Select
            label={placeholder}
            onChange={(event) => {
              handleChange(event);
              if (onChange) {
                onChange(event.target.value as string);
              }
            }}
            value={value}
            disabled={disabled}
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option.value!}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </>
  );
};

export default InputSelect;
