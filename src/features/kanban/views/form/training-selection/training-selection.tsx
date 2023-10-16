import { FC, useContext } from "react";
import { FormControl } from "@mui/material";
import RHF from "shared/components/input-RHF";
import { ITrainingSelection } from "./training-selection.types";
import { KanbanFormContext } from "../../../context/kanban-form-context";

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
    <FormControl fullWidth>
      <RHF.InputSelect
        control={control}
        options={trainingOptions}
        name="trainings"
        placeholder="Выберите курс"
        onChange={handleSelectChange}
      />
    </FormControl>
  );
};

export default TrainingSelection;
