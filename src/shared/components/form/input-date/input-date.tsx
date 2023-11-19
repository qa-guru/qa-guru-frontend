import * as React from "react";
import { useCallback } from "react"; // Import useCallback
import { Controller, FieldValues } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IFormInputDate } from "./input-date.types";
import { StyledDatePicker } from "./input-date.styled";
import { DEFAULT_TIME_VALUE, INPUT_DATE_FORMAT } from "../../../constants";

const InputDate = <T extends FieldValues>({
  control,
  name,
  label,
  onChange,
}: IFormInputDate<T>) => {
  const handleChange = useCallback(
    (newValue: unknown, fieldOnChange: (value: string) => void) => {
      if (newValue) {
        const formattedDate = dayjs(Number(newValue))
          .set("hour", DEFAULT_TIME_VALUE)
          .set("minute", DEFAULT_TIME_VALUE)
          .set("second", DEFAULT_TIME_VALUE)
          .format(INPUT_DATE_FORMAT);
        fieldOnChange(formattedDate);
        if (onChange) onChange(formattedDate);
      }
    },
    [onChange]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange: fieldOnChange, value } }) => (
          <StyledDatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => handleChange(newValue, fieldOnChange)}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
