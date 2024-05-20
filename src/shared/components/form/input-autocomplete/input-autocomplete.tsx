import { Controller, FieldValues } from "react-hook-form";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";

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
  loading,
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
              <TextField
                {...params}
                label={placeholder}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="primary" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        )}
      />
    </FormControl>
  );
};

export default InputAutocomplete;
