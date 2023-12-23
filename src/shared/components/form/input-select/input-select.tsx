import { Controller, FieldValues } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";
import { useCallback } from "react";

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
  const handleChange = useCallback(
    (event: SelectChangeEvent, fieldOnChange: (value: string) => void) => {
      fieldOnChange(event.target.value);

      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );

  return (
    <FormControl fullWidth>
      <InputLabel>{placeholder}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange: fieldOnChange } }) => (
          <Select
            label={placeholder}
            onChange={(event) => handleChange(event, fieldOnChange)}
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
