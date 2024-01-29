import { Controller, FieldValues } from "react-hook-form";
import { Autocomplete, FormControl, TextField } from "@mui/material";

import { IFormInputText } from "./input-autocomplete.types";

const InputAutocomplete = <T extends FieldValues>({
  control,
  name,
  placeholder,
  options,
  onSelect,
}: IFormInputText<T>) => {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            onChange={(_, item) => {
              onChange(item);
              if (onSelect) {
                onSelect(item);
              }
            }}
            disablePortal
            options={options}
            size="small"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} label={placeholder} value={value || ""} />
            )}
          />
        )}
      />
    </FormControl>
  );
};

export default InputAutocomplete;
