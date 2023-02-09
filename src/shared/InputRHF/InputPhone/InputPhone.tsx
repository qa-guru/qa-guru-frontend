import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
import React from "react";
import { Box } from "@mui/material";
import { countries } from "./InputPhone.countries";
import { TextFieldStyled } from "../InputTextField/InputTextField.styled";
import { AutocompleteStyled } from "./AutocompleteStyled.styled";

const InputPhone: React.FC<IFormInputProps> = ({
  control,
  name,
  label,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <AutocompleteStyled
          options={countries}
          freeSolo
          getOptionLabel={(option: any) => `(${option.code})+${option.phone}`}
          renderOption={(props, option: any) => (
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
            <TextFieldStyled
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
