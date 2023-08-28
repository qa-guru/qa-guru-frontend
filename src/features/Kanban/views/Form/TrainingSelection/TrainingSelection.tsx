import React, { useContext } from "react";
import { FormControl } from "@mui/material";
import { ITrainingSelection } from "./TrainingSelection.types";
import RHF from "../../../../../shared/components/InputRHF";
import { KanbanContext } from "../../../context/KanbanContext";

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
