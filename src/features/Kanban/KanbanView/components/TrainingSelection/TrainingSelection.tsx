import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FormControl } from "@mui/material";
import { ITrainingSelection } from "./TrainingSelection.types";
import RHF from "../../../../../shared/InputRHF";
import { SelectedTrainingIdContext } from "../../../../../context/SelectedTrainingIdContext";

const TrainingSelection: React.FC<ITrainingSelection> = ({ data }) => {
  const { items } = data.trainingsByMentor!;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      selectTrainings: "",
    },
  });
  const { setSelectedTrainingId } = useContext(SelectedTrainingIdContext);

  const trainingOptions = items?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const handleSelectChange = (selectedId: string) => {
    setSelectedTrainingId(selectedId);
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
