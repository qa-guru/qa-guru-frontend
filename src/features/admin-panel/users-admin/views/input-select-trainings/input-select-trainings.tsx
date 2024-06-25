import { Maybe, TrainingsQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { InputAutocomplete } from "shared/components/form";
import { OptionTypeBase } from "shared/components/form/input-autocomplete/input-autocomplete.types";

interface IInputSelectTrainings {
  data: TrainingsQuery;
  loading: boolean;
}

const InputSelectTrainings: FC<IInputSelectTrainings> = ({ data, loading }) => {
  const items = data?.trainings?.items;
  const { control } = useForm({
    defaultValues: {
      trainings: "",
    },
  });

  const trainingsOptions =
    items?.map((item) => ({
      id: item?.id || "",
      label: `${item?.name}`,
    })) || [];

  const handleSelectChange = (selected: Maybe<OptionTypeBase>) => {};

  return (
    <InputAutocomplete
      control={control}
      name="trainings"
      placeholder="Выберите курс"
      options={trainingsOptions}
      onSelect={handleSelectChange}
      loading={loading}
    />
  );
};

export default InputSelectTrainings;
