import { FC } from "react";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { StyledChip, StyledOptionChip } from "./input-select-training.styled";
import {
  IInputSelectTrainings,
  ITrainingOption,
} from "./input-select-trainings.types";

const InputSelectTrainings: FC<IInputSelectTrainings> = ({
  data,
  loading,
  updateTrainingPurchase,
  user,
  trainingPurchases,
}) => {
  const items = data?.trainings?.items || [];
  const trainingPurchasesByUserId =
    trainingPurchases?.trainingPurchasesByUserId;

  const defaultTrainingPurchases = trainingPurchasesByUserId?.map(
    (trainingPurchase) => ({
      id: trainingPurchase?.id!,
      name: trainingPurchase?.trainingTariff.name!,
      code: trainingPurchase?.trainingTariff.code!,
      techStack: trainingPurchase?.trainingTariff.training?.techStack,
    })
  );

  const { control, setValue } = useForm<{
    trainings: ITrainingOption[];
  }>({
    defaultValues: {
      trainings: defaultTrainingPurchases,
    },
  });

  const trainingsOptions = items.map((item) => ({
    id: item?.id || "",
    name: `${item?.name}`,
    code: item?.tariffs?.map((tariff) => tariff?.code).toString(),
    techStack: item?.techStack!,
  }));

  const handleSelectChange = (trainings: ITrainingOption[]) => {
    setValue("trainings", trainings);

    trainings.map((training) =>
      updateTrainingPurchase({
        variables: {
          input: {
            id: training?.id,
            userEmail: user?.email,
            trainingTariffCode: training.code,
          },
        },
      })
    );
  };

  return (
    <FormControl fullWidth>
      <Controller
        name="trainings"
        control={control}
        render={({ field: { onChange, value = [] } }) => (
          <Autocomplete
            multiple
            options={trainingsOptions}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            value={value || []}
            limitTags={3}
            onChange={(_, newValue) => {
              onChange(newValue);
              handleSelectChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Начните вводить название курса..."
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
            renderTags={(tagValue, getTagProps) => {
              const visibleTags = tagValue.slice(-3);
              const hiddenTagCount = tagValue.length - visibleTags.length;

              return (
                <>
                  {visibleTags.map((option, index) => (
                    <StyledChip
                      {...getTagProps({ index })}
                      key={option.id}
                      label={option.name}
                      size="small"
                    />
                  ))}
                  {hiddenTagCount > 0 && (
                    <StyledChip label={`+${hiddenTagCount}`} size="small" />
                  )}
                </>
              );
            }}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <StyledOptionChip variant="outlined" label={option.name} />
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

export default InputSelectTrainings;
