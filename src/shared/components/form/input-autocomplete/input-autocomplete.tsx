import { useState } from "react";
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
  const [value, setValue] = useState<string | null>("");

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Autocomplete
            onChange={(_, value) => {
              onChange(value);
              if (onSelect && value) {
                onSelect(value);
              }
              if (!value) {
                onSelect(null);
              }
            }}
            disablePortal
            disabled={disabled}
            options={options}
            size="small"
            isOptionEqualToValue={(option, value) =>
              option && value && option.id === value.id
            }
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
