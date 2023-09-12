import React, { useContext } from "react";
import { FormControl } from "@mui/material";
import { ITrainingSelection } from "./training-selection.types";
import RHF from "../../../../../shared/components/input-RHF";
import { KanbanContext } from "../../../context/kanban-context";

const TrainingSelection: React.FC<ITrainingSelection> = ({
  items,
  control,
}) => {
  const { setSelectedTrainingId } = useContext(KanbanContext);

  const trainingOptions = items?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const handleSelectChange = (selectedId: string) => {
    setSelectedTrainingId(selectedId);
  };

  return (
    <FormControl fullWidth>
      <RHF.InputSelect
        control={control}
        options={trainingOptions}
        name="selectTrainings"
        placeholder="Выберите курс"
        onChange={handleSelectChange}
      />
    </FormControl>
  );
};

export default TrainingSelection;
