import React from "react";
import { FormControl, Tooltip } from "@mui/material";
import ISelectLectures from "./LectureSelection.types";
import RHF from "../../../../../../shared/InputRHF";

const LectureSelection: React.FC<ISelectLectures> = ({ data, control }) => {
  const lecturesOptions = data?.trainingLectures?.map((item) => ({
    value: item?.lecture?.id,
    label: item?.lecture?.subject,
  }));

  return (
    <>
      {!lecturesOptions ? (
        <Tooltip title="Выберите курс" placement="top">
          <FormControl fullWidth>
            <RHF.Select
              control={control}
              name="selectLectures"
              placeholder="Выберите урок"
              options={lecturesOptions}
              disabled={!lecturesOptions}
            />
          </FormControl>
        </Tooltip>
      ) : (
        <FormControl fullWidth>
          <RHF.Select
            control={control}
            name="selectLectures"
            placeholder="Выберите урок"
            options={lecturesOptions}
            disabled={!lecturesOptions}
          />
        </FormControl>
      )}
    </>
  );
};

export default LectureSelection;
