import { Controller, FieldValues } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";

import { IFormInputSelect } from "./input-select.types";
import { OptionTypeBase } from "../input-autocomplete/input-autocomplete.types";
import { StyledInputLabel } from "./input-select.styled";

const InputSelect = <
  T extends FieldValues,
  OptionType extends OptionTypeBase,
  SelectType
>({
  control,
  placeholder,
  name,
  options,
  onSelect,
  defaultValue,
  disabled = false,
}: IFormInputSelect<T, OptionType, SelectType>) => {
  return (
    <FormControl size="small" fullWidth>
      <StyledInputLabel>{placeholder}</StyledInputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={(event: SelectChangeEvent) => {
              const targetValue = event.target.value as SelectType;
              if (onChange) {
                onChange(targetValue);
              }
              onSelect(targetValue);
            }}
            value={value || defaultValue || ""}
            displayEmpty
            defaultValue={defaultValue}
            disabled={disabled}
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option.id}>
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
