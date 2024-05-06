import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { UsersQuery } from "api/graphql/generated/graphql";
import { DebouncedFunc } from "lodash";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import UserRow from "shared/components/user-row";

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});

interface ISelectMentors {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  data?: UsersQuery;
  onSearchChange: DebouncedFunc<(searchValue: string) => void>;
  loading: boolean;
  name: string;
}

const SelectMentors: FC<ISelectMentors> = ({
  control,
  data,
  onSearchChange,
  loading,
  name,
}) => {
  const items = data?.users?.items || [];

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value = [] } }) => (
          <Autocomplete
            multiple
            options={items}
            getOptionLabel={(option) => option.firstName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={value || []}
            onInputChange={(_, newInputValue) => onSearchChange(newInputValue)}
            onChange={(_, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Начните вводить имя..."
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
                <Chip
                  {...getTagProps({ index })}
                  key={option.id}
                  variant="outlined"
                  sx={{ border: "none" }}
                  avatar={<UserRow width={30} height={30} user={option} />}
                />
              ))
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Chip
                  variant="outlined"
                  sx={{ border: "none" }}
                  avatar={<UserRow width={30} height={30} user={option} />}
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

export default SelectMentors;
