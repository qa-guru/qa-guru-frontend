import { FC, useContext } from "react";
import { InputDate } from "shared/components/form";
import { ICreationDateToSelection } from "./creation-date-to-selection.types";
import { KanbanFormContext } from "../../context/kanban-form-context";

const CreationDateToSelection: FC<ICreationDateToSelection> = ({ control }) => {
  const { setCreationDateTo } = useContext(KanbanFormContext);

  const handleSelectChange = (selectedId: string) => {
    setCreationDateTo(selectedId);
  };

  return (
    <InputDate
      control={control}
      name="creationDateTo"
      label="Созданные до"
      onChange={handleSelectChange}
    />
  );
};

export default CreationDateToSelection;
