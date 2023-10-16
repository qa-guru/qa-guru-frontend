import { FC, useContext } from "react";
import RHF from "shared/components/input-RHF";
import { ICreationDateToSelection } from "./creation-date-to-selection.types";
import { KanbanFormContext } from "../../../context/kanban-form-context";

const CreationDateToSelection: FC<ICreationDateToSelection> = ({ control }) => {
  const { setCreationDateTo } = useContext(KanbanFormContext);

  const handleSelectChange = (selectedId: string) => {
    setCreationDateTo(selectedId);
  };

  return (
    <RHF.InputDatePicker
      control={control}
      name="creationDateTo"
      label="Созданные до"
      onChange={handleSelectChange}
    />
  );
};

export default CreationDateToSelection;
