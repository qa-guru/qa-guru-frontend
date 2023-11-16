import { Controller, FieldValues } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IFormInputSelect } from "./input-select.types";

const InputSelect = <T extends FieldValues>({
  control,
  placeholder,
  name,
  options,
  defaultValue,
  onChange,
  disabled = false,
}: IFormInputSelect<T>) => {
  return (
    <FormControl fullWidth>
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
    </FormControl>
  );
};

export default InputSelect;
