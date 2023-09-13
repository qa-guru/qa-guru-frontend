import { Controller, FieldValues } from "react-hook-form";
import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { countries } from "./input-phone.types";
import { IFormInputProps } from "../input.types";

const InputPhone = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: IFormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          options={countries}
          freeSolo
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            }
            return `(${option.code})+${option.phone}`;
          }}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt="flag"
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              value={value}
              onChange={onChange}
              {...params}
              inputProps={{
                ...params.inputProps,
              }}
              label={label}
              placeholder={placeholder}
            />
          )}
        />
      )}
    />
  );
};

export default InputPhone;
