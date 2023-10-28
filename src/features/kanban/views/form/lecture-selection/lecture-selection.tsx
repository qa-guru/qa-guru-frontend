import React, { FC, useContext } from "react";
import { Tooltip } from "@mui/material";
import InputSelect from "shared/components/form/input-select";
import ISelectLectures from "./lecture-selection.types";
import { KanbanFormContext } from "../../../context/kanban-form-context";

const LectureSelection: FC<ISelectLectures> = ({ data, control }) => {
  const { setLectureId } = useContext(KanbanFormContext);

  const lecturesOptions = data?.trainingLectures?.map((item) => ({
    value: item?.lecture?.id,
    label: item?.lecture?.subject,
  }));

  const isDisabled = !lecturesOptions;

  const handleSelectChange = (selectedId: string) => {
    setLectureId(selectedId);
  };

  return (
    <Tooltip title={isDisabled ? "Выберите курс" : ""} placement="top">
      <InputSelect
        control={control}
        name="lectures"
        placeholder="Выберите урок"
        options={lecturesOptions}
        disabled={isDisabled}
        onChange={handleSelectChange}
      />
    </Tooltip>
  );
};

export default LectureSelection;
