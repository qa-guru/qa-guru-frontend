import { FC } from "react";

import { InputDate } from "shared/components/form/";

import { ICreationDateFromSelection } from "./creation-date-from-selection.types";
import { useKanbanForm } from "../../context/kanban-form-context";

const CreationDateFromSelection: FC<ICreationDateFromSelection> = ({
  control,
}) => {
  const { setCreationDateFrom } = useKanbanForm();

  const handleSelectChange = (selectedId: string) => {
    setCreationDateFrom(selectedId);
  };

  return (
    <InputDate
      control={control}
      name="creationDateFrom"
      label="Созданные от"
      key="creationDateFrom"
      onChange={handleSelectChange}
    />
  );
};

export default CreationDateFromSelection;
