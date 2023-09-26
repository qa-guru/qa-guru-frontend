import React from "react";
import { FormControl, Tooltip } from "@mui/material";
import ISelectLectures from "./lecture-selection.types";
import RHF from "../../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/shared/components/input-RHF";

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
