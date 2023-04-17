import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IFormInputProps } from "../Input.types";

const InputSelect: React.FC<IFormInputProps> = ({
  control,
  placeholder,
  name,
  options,
  defaultValue,
  onChange,
  disabled = false,
}) => {
  return (
    <FormControl>
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
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default InputSelect;
