import React, { FC, useContext } from "react";
import { FormControl } from "@mui/material";
import RHF from "shared/components/input-RHF";
import { IMentorSelection } from "./mentor-selection.types";
import { KanbanFormContext } from "../../../context/kanban-form-context";

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
    <FormControl fullWidth>
      <RHF.InputSelect
        control={control}
        options={mentorsOptions}
        name="mentors"
        placeholder="Выберите наставника"
        onChange={handleSelectChange}
      />
    </FormControl>
  );
};

export default MentorSelection;
