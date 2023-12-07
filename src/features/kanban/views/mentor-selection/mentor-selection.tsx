import { FC, useContext } from "react";
import { InputSelect } from "shared/components/form";

import { IMentorSelection } from "./mentor-selection.types";
import { KanbanFormContext } from "../../context/kanban-form-context";

const MentorSelection: FC<IMentorSelection> = ({ data, control }) => {
  const items = data?.mentors?.items;
  const { setMentorId } = useContext(KanbanFormContext);

  const mentorsOptions = items?.map((item) => ({
    value: item?.id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  const handleSelectChange = (selectedId: string) => {
    setMentorId(selectedId);
  };

  return (
    <InputSelect
      control={control}
      options={mentorsOptions}
      name="mentors"
      placeholder="Выберите наставника"
      onChange={handleSelectChange}
    />
  );
};

export default MentorSelection;
