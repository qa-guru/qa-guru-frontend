import * as React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IFormInputProps } from "../input.types";
import { StyledDatePicker } from "../input.styled";
import { DEFAULT_TIME_VALUE, INPUT_DATE_FORMAT } from "../../../constants";

const InputDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  onChange,
}: IFormInputProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange: handleChange, value } }) => (
          <StyledDatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => {
              if (newValue) {
                const formattedDate = dayjs(Number(newValue))
                  .set("hour", DEFAULT_TIME_VALUE)
                  .set("minute", DEFAULT_TIME_VALUE)
                  .set("second", DEFAULT_TIME_VALUE)
                  .format(INPUT_DATE_FORMAT);
                handleChange(formattedDate);
                if (onChange) onChange(formattedDate);
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default InputDatePicker;
