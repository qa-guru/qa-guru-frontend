import { Controller, FieldValues } from "react-hook-form";
import { Autocomplete, FormControl, TextField } from "@mui/material";

import { IFormInputText, OptionTypeBase } from "./input-autocomplete.types";

const InputAutocomplete = <
  T extends FieldValues,
  OptionType extends OptionTypeBase
>({
  control,
  name,
  placeholder,
  options,
  onSelect,
  disabled,
}: IFormInputText<T, OptionType>) => {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            value={value || null}
            onChange={(_, item) => {
              onChange(item);
              if (onSelect) {
                onSelect(item);
              }
            }}
            disablePortal
            disabled={disabled}
            options={options}
            size="small"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} label={placeholder} />
            )}
          />
        )}
      />
    </FormControl>
  );
};

export default InputAutocomplete;
