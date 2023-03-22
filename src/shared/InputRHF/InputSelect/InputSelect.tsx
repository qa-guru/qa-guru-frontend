import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IFormInputProps } from "../Input.types";

const InputSelect: React.FC<IFormInputProps> = ({
  control,
  placeholder,
  name,
  content,
  defaultValue,
}) => {
  const generateMenuItem = () => {
    return content.map((option: string) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
  };

  return (
    <FormControl>
      <InputLabel>{placeholder}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <Select label={placeholder} onChange={onChange} value={value}>
            {generateMenuItem()}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default InputSelect;
