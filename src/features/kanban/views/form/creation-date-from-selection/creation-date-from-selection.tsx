import { FC, useContext } from "react";
import RHF from "shared/components/input-RHF";
import { ICreationDateFromSelection } from "./creation-date-from-selection.types";
import { KanbanFormContext } from "../../../context/kanban-form-context";

const CreationDateFromSelection: FC<ICreationDateFromSelection> = ({
  control,
}) => {
  const { setCreationDateFrom } = useContext(KanbanFormContext);

  const handleSelectChange = (selectedId: string) => {
    setCreationDateFrom(selectedId);
  };

  return (
    <RHF.InputDatePicker
      control={control}
      name="creationDateFrom"
      label="Созданные от"
      onChange={handleSelectChange}
    />
  );
};

export default CreationDateFromSelection;
