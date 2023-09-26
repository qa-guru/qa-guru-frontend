import React, { useContext } from "react";
import { FormControl } from "@mui/material";
import { IMentorSelection } from "./mentor-selection.types";
import { KanbanContext } from "../../../context/kanban-context";
import RHF from "../../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/shared/components/input-RHF";

const MentorSelection: React.FC<IMentorSelection> = ({ data, control }) => {
  const items = data?.mentors?.items;
  const { setSelectedMentorId } = useContext(KanbanContext);

  const mentorsOptions = items?.map((item) => ({
    value: item?.id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  return (
    <FormControl fullWidth>
      <RHF.InputSelect
        control={control}
        options={mentorsOptions}
        name="selectMentors"
        placeholder="Выберите наставника"
      />
    </FormControl>
  );
};

export default MentorSelection;
