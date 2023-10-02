import React, { useContext } from "react";
import { FormControl } from "@mui/material";
import RHF from "shared/components/input-RHF";
import { IMentorSelection } from "./mentor-selection.types";
import { KanbanContext } from "../../../context/kanban-context";

const MentorSelection: React.FC<IMentorSelection> = ({ data, control }) => {
  const items = data?.mentors?.items;
  const { setMentorId } = useContext(KanbanContext);

  const mentorsOptions = items?.map((item) => ({
    value: item?.id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  const handleSelectChange = (selectedId: string) => {
    setMentorId(selectedId);
  };

  return (
    <FormControl fullWidth>
      <RHF.InputSelect
        control={control}
        options={mentorsOptions}
        name="selectMentors"
        placeholder="Выберите наставника"
        onChange={handleSelectChange}
      />
    </FormControl>
  );
};

export default MentorSelection;
