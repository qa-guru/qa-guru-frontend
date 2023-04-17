import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FormControl } from "@mui/material";
import ISelectLectures from "./LectureSelection.types";
import RHF from "../../../../../shared/InputRHF";
import { SelectedLectureIdContext } from "../../../../../context/SelectedLectureIdContext";

const LectureSelection: React.FC<ISelectLectures> = ({ data }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      selectLectures: "",
    },
  });
  const { setSelectedLectureId } = useContext(SelectedLectureIdContext);

  const lecturesOptions = data?.trainingLectures?.map((item) => ({
    value: item?.lecture?.id,
    label: item?.lecture?.subject,
  }));

  const handleSelectChange = (selectedId: string) => {
    setSelectedLectureId(selectedId);
  };

  return (
    <FormControl fullWidth>
      <RHF.Select
        control={control}
        name="selectLectures"
        placeholder="Выберите урок"
        disabled={!data}
        options={lecturesOptions}
        onChange={handleSelectChange}
      />
    </FormControl>
  );
};

export default LectureSelection;
