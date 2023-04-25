import React, { useContext } from "react";
import { FormControl } from "@mui/material";
import { ITrainingSelection } from "./TrainingSelection.types";
import RHF from "../../../../../shared/InputRHF";
import { KanbanContext } from "../../../context/KanbanContext";

const TrainingSelection: React.FC<ITrainingSelection> = ({ data, control }) => {
  const { items } = data.trainingsByMentor!;
  const { setSelectedTrainingId, setShouldSkipHomeWorks } =
    useContext(KanbanContext);

  const trainingOptions = items?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const handleSelectChange = (selectedId: string) => {
    setSelectedTrainingId(selectedId);
    setShouldSkipHomeWorks(true);
  };

  return (
    <FormControl fullWidth>
      <RHF.Select
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
