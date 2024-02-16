import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";

import { IFormInputChip } from "./input-chip.types";
import { StyledBox, StyledChip } from "./input-chip.styled";

const InputChip = <T extends FieldValues, OptionType>({
  control,
  placeholder,
  name,
  options,
  onDelete,
  onChange,
}: IFormInputChip<T, OptionType>) => {
  const handleChange = (
    event: SelectChangeEvent<OptionType[]>,
    fieldOnChange: (value: OptionType[]) => void
  ) => {
    const {
      target: { value },
    } = event;
    const selectedValues = value as OptionType[];

    fieldOnChange(selectedValues);

    if (onChange) {
      onChange(selectedValues);
    }
  };

  const handleDelete = (chipToDelete: OptionType) => {
    onDelete(chipToDelete);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel>{placeholder}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange: fieldOnChange } }) => {
          return (
            <Select
              multiple
              value={value}
              size="medium"
              onChange={(event) => handleChange(event, fieldOnChange)}
              input={<OutlinedInput />}
              renderValue={(selected: OptionType[]) => {
                return (
                  <StyledBox>
                    {selected.map((value) => (
                      <StyledChip
                        size="small"
                        key={String(value)}
                        label={String(value)}
                        onDelete={() => handleDelete(value)}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    ))}
                  </StyledBox>
                );
              }}
            >
              {options?.map((option) => (
                <MenuItem value={String(option)} key={String(option)}>
                  {String(option)}
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
    </FormControl>
  );
};

export default InputChip;
