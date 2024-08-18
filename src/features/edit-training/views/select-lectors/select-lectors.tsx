import {
  Autocomplete,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

import UserRow from "shared/components/user-row";

import { ISelectLectors } from "./select-lectors.types";
import { StyledChip, StyledOptionChip } from "./select-lectors.styled";

const SelectLectors: FC<ISelectLectors> = ({
  control,
  data,
  onSearchChange,
  loading,
  name,
}) => {
  const items = data?.users?.items || [];

  const lectorOptions =
    items?.map((item) => ({
      ...item,
      name: `${item?.firstName} ${item?.lastName}`,
    })) || [];

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            multiple
            options={lectorOptions}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={value || []}
            onInputChange={(_, newInputValue) => onSearchChange(newInputValue)}
            onChange={(_, newValue) => {
              onChange(newValue);
            }}
            disablePortal
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Выберите преподавателя"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <StyledChip
                  {...getTagProps({ index })}
                  key={option.id}
                  avatar={
                    <UserRow width={22} height={22} user={option} hideRating />
                  }
                />
              ))
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <StyledOptionChip
                  variant="outlined"
                  avatar={
                    <UserRow width={30} height={30} user={option} hideRating />
                  }
                />
              </li>
            )}
            loading={loading}
            loadingText="Загрузка..."
          />
        )}
      />
    </FormControl>
  );
};

export default SelectLectors;
