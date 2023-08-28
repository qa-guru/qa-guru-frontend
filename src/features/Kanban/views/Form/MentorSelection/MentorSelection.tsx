import React, { useContext } from "react";
import { FormControl } from "@mui/material";
import { IMentorSelection } from "./MentorSelection.types";
import { KanbanContext } from "../../../context/KanbanContext";
import RHF from "../../../../../shared/components/InputRHF";

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
