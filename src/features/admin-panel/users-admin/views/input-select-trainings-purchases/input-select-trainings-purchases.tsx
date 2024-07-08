import { FC } from "react";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import {
  StyledChip,
  StyledOptionChip,
} from "./input-select-trainings-purchases.styled";
import {
  IInputSelectTrainingsPurchases,
  ITrainingOption,
} from "./input-select-trainings-purchases.types";

const InputSelectTrainingsPurchases: FC<IInputSelectTrainingsPurchases> = ({
  dataTrainings,
  dataTrainingPurchasesByUserId,
  loadingUpdateTrainingPurchase,
  updateTrainingPurchase,
  user,
}) => {
  const trainingItems = dataTrainings?.trainings?.items || [];
  const arrayTrainingPurchasesByUserId =
    dataTrainingPurchasesByUserId?.trainingPurchasesByUserId;

  const defaultTrainingPurchasesByUserId = arrayTrainingPurchasesByUserId?.map(
    (trainingPurchaseByUserId) => {
      const { trainingTariff, id } = trainingPurchaseByUserId!;
      const { name, code, training } = trainingTariff!;
      const { techStack } = training!;

      return {
        id: id!,
        name: name!,
        code: code!,
        techStack: techStack!,
      };
    }
  );

  const { control, setValue } = useForm<{
    trainings: ITrainingOption[];
  }>({
    defaultValues: {
      trainings: defaultTrainingPurchasesByUserId,
    },
  });

  const trainingsOptions = trainingItems.map((item) => {
    const { id, name, tariffs, techStack } = item!;

    return {
      id: id || "",
      name: `${name}`,
      code: tariffs?.map((tariff) => tariff?.code).toString(),
      techStack: techStack!,
    };
  });

  const handleSelectChange = (trainings: ITrainingOption[]) => {
    setValue("trainings", trainings);

    const trainingInput = trainings.map(({ id, code }) => ({
      id,
      trainingTariffCode: code,
      userEmail: user?.email,
    }));

    updateTrainingPurchase({
      variables: {
        input: trainingInput,
      },
    });
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
                      {loadingUpdateTrainingPurchase ? (
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
            loading={loadingUpdateTrainingPurchase}
            loadingText="Загрузка..."
          />
        )}
      />
    </FormControl>
  );
};

export default InputSelectTrainingsPurchases;
