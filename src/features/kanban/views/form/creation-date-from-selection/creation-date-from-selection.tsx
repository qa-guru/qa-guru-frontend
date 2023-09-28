import * as React from "react";
import RHF from "shared/components/input-RHF";
import { useContext } from "react";
import { ICreationDateFromSelection } from "./creation-date-from-selection.types";
import { KanbanContext } from "../../../context/kanban-context";

const CreationDateFromSelection: React.FC<ICreationDateFromSelection> = ({
  control,
}) => {
  const { setSelectedCreationDateFrom } = useContext(KanbanContext);

  const handleSelectChange = (selectedId: string) => {
    setSelectedCreationDateFrom(selectedId);
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
