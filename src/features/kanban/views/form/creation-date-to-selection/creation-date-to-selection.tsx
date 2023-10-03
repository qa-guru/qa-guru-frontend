import React, { useContext } from "react";
import RHF from "shared/components/input-RHF";
import { ICreationDateToSelection } from "./creation-date-to-selection.types";
import { KanbanContext } from "../../../context/kanban-context";

const CreationDateToSelection: React.FC<ICreationDateToSelection> = ({
  control,
}) => {
  const { setCreationDateTo } = useContext(KanbanContext);

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
