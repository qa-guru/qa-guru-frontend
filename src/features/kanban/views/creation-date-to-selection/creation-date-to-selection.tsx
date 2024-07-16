import { FC } from "react";
import { InputDate } from "shared/components/form";

import { ICreationDateToSelection } from "./creation-date-to-selection.types";
import { useKanbanForm } from "../../context/kanban-form-context";

const CreationDateToSelection: FC<ICreationDateToSelection> = ({ control }) => {
  const { setCreationDateTo } = useKanbanForm();

  const handleSelectChange = (selectedId: string) => {
    setCreationDateTo(selectedId);
  };

  return (
    <InputDate
      control={control}
      name="creationDateTo"
      label="Созданные до"
      key="creationDateTo"
      onChange={handleSelectChange}
    />
  );
};

export default CreationDateToSelection;
