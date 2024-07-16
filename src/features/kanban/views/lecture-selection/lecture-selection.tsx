import { FC } from "react";
import { Box, Tooltip } from "@mui/material";
import { InputAutocomplete } from "shared/components/form";
import { Maybe } from "api/graphql/generated/graphql";
import { OptionTypeBase } from "shared/components/form/input-autocomplete/input-autocomplete.types";

import ISelectLectures from "./lecture-selection.types";
import { useKanbanForm } from "../../context/kanban-form-context";

const LectureSelection: FC<ISelectLectures> = ({ data, control }) => {
  const { setLectureId } = useKanbanForm();

  const lecturesOptions =
    data?.trainingLectures?.map((item) => ({
      id: item?.lecture?.id || "",
      label: item?.lecture?.subject || "",
    })) || [];

  const isDisabled = lecturesOptions.length === 0;

  const handleSelectChange = (selected: Maybe<OptionTypeBase>) => {
    if (!selected) {
      setLectureId(null);
    } else {
      setLectureId(selected!.id);
    }
  };

  return (
    <Tooltip title={isDisabled ? "Выберите курс" : ""}>
      <Box width="100%">
        <InputAutocomplete
          control={control}
          name="lectures"
          placeholder="Выберите урок"
          options={lecturesOptions}
          disabled={isDisabled}
          onSelect={handleSelectChange}
        />
      </Box>
    </Tooltip>
  );
};

export default LectureSelection;
