import { FC, useContext } from "react";
import { InputSelect } from "shared/components/form";

import { ITrainingSelection } from "./training-selection.types";
import { KanbanFormContext } from "../../context/kanban-form-context";

const TrainingSelection: FC<ITrainingSelection> = ({ items, control }) => {
  const { setTrainingId } = useContext(KanbanFormContext);

  const trainingOptions = items?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const handleSelectChange = (selectedId: string) => {
    setTrainingId(selectedId);
  };

  return (
    <InputSelect
      control={control}
      options={trainingOptions}
      name="trainings"
      placeholder="Выберите курс"
      onChange={handleSelectChange}
    />
  );
};

export default TrainingSelection;
