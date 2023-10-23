import { Controller, FieldValues } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { IFormInputProps } from "../input.types";
import { StyledInputLabel } from "../input.styled";

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
      <StyledInputLabel>{placeholder}</StyledInputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange: handleChange } }) => (
          <Select
            label={placeholder}
            onChange={(event) => {
              handleChange(event);
              if (onChange) onChange(event.target.value as string);
            }}
            value={value}
            disabled={disabled}
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option?.value!}>
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
