import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
  Chip,
} from "@mui/material";

import { useTestTestGroupsQuery } from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";

interface SelectTestsProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
}

const SelectTests: FC<SelectTestsProps> = ({
  name,
  control,
  label = "Тест для лекции",
  helperText,
}) => {
  const { data: testsData, loading, error } = useTestTestGroupsQuery();

  const tests = testsData?.testTestGroups || [];

  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
        <AppSpinner />
        <Typography variant="body2" color="text.secondary">
          Загрузка тестов...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body2" color="error">
        Ошибка загрузки тестов
      </Typography>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormControl fullWidth error={!!fieldError}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            label={label}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Без теста</em>
            </MenuItem>
            {tests.map((test) => (
              <MenuItem key={test?.id} value={test?.id || ""}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                  }}
                >
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {test?.testName}
                  </Typography>
                  <Chip
                    label={`${test?.successThreshold} правильных ответов`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </MenuItem>
            ))}
          </Select>
          {(fieldError || helperText) && (
            <FormHelperText>{fieldError?.message || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default SelectTests;
