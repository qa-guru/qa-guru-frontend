import React from "react";
import { FormControl, Tooltip } from "@mui/material";
import RHF from "shared/components/input-RHF";
import ISelectLectures from "./lecture-selection.types";

const LectureSelection: React.FC<ISelectLectures> = ({ data, control }) => {
  const lecturesOptions = data?.trainingLectures?.map((item) => ({
    value: item?.lecture?.id,
    label: item?.lecture?.subject,
  }));

  const isDisabled = !lecturesOptions;

  return (
    <Tooltip title={isDisabled ? "Выберите курс" : ""} placement="top">
      <FormControl fullWidth>
        <RHF.InputSelect
          control={control}
          name="selectLectures"
          placeholder="Выберите урок"
          options={lecturesOptions}
          disabled={isDisabled}
        />
      </FormControl>
    </Tooltip>
  );
};

export default LectureSelection;
