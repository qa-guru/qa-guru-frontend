import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, FieldValues } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IFormInputProps } from "../input.types";

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
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            sx={{ width: "100%" }}
            onChange={(newValue) => {
              if (newValue) {
                const formattedDate = dayjs(newValue)
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
