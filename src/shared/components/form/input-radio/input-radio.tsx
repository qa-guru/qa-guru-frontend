import { Controller, FieldValues } from "react-hook-form";
import {
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { IFormInputRadio } from "./input-radio.types";

const InputRadio = <T extends FieldValues>({
  control,
  label,
  name,
  options,
}: IFormInputRadio<T>) => {
  const generateRadioOptions = () => {
    return options?.map((item, index) => {
      return (
        <FormControlLabel
          key={index}
          value={item.value}
          control={<Radio />}
          label={item.label}
        />
      );
    });
  };

  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup name={name} value={value} onChange={onChange} row>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default InputRadio;
