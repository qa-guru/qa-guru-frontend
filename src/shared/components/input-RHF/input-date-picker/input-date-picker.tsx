import * as React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IFormInputProps } from "../input.types";
import { StyledDatePicker } from "../input.styled";

const InputDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
}: IFormInputProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <StyledDatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => {
              if (newValue) {
                const formattedDate = dayjs(Number(newValue))
                  .set("hour", 0)
                  .set("minute", 0)
                  .set("second", 0)
                  .format("YYYY-MM-DDTHH:mm:ss");
                onChange(formattedDate);
              } else {
                onChange(null);
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default InputDatePicker;
