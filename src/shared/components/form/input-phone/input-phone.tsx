import { Controller, FieldValues } from "react-hook-form";
import { Autocomplete, FormControl, TextField } from "@mui/material";

import { countries, IFormInputPhone } from "./input-phone.types";
import { StyledFormHelperText, StyledImgBox } from "./input-phone.styled";

const InputPhone = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  errors,
  InputLabelProps,
}: IFormInputPhone<T>) => {
  return (
    <FormControl fullWidth error={Boolean(errors[name])}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            options={countries}
            freeSolo
            inputValue={value}
            onInputChange={(_, newInputValue) => onChange(newInputValue)}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              return `(${option.code})+${option.phone}`;
            }}
            renderOption={(props, option) => (
              <StyledImgBox {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt="flag"
                />
                {option.label} ({option.code}) +{option.phone}
              </StyledImgBox>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                InputLabelProps={InputLabelProps}
              />
            )}
          />
        )}
      />
      {errors[name] && (
        <StyledFormHelperText>{errors[name].message}</StyledFormHelperText>
      )}
    </FormControl>
  );
};

export default InputPhone;
