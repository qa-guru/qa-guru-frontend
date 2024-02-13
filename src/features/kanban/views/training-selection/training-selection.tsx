import { FC, useContext } from "react";
import { InputAutocomplete } from "shared/components/form";
import { Maybe } from "api/graphql/generated/graphql";
import { OptionTypeBase } from "shared/components/form/input-autocomplete/input-autocomplete.types";

import { ITrainingSelection } from "./training-selection.types";
import { KanbanFormContext } from "../../context/kanban-form-context";

const TrainingSelection: FC<ITrainingSelection> = ({ items, control }) => {
  const { setTrainingId, setLectureId } = useContext(KanbanFormContext);

  const trainingOptions =
    items?.map((item) => ({
      id: item?.id || "",
      label: item?.name || "",
    })) ?? [];

  const handleSelectChange = (selected: Maybe<OptionTypeBase>) => {
    if (!selected) {
      setTrainingId(null);
      setLectureId(null);
    } else {
      setTrainingId(selected!.id);
    }
  };

  return (
    <InputAutocomplete
      control={control}
      name="trainings"
      options={trainingOptions}
      placeholder="Выберите курс"
      onSelect={handleSelectChange}
    />
  );
};

export default TrainingSelection;
