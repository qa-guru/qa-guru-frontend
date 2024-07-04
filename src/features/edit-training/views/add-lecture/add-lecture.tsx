import { FC } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { IAddLecture } from "./add-lecture.types";

const AddLecture: FC<IAddLecture> = ({
  updateTrainingLecture,
  lectureIds,
  loadingUpdateTrainingLecture,
  selectedLectureId,
  trainingId,
}) => {
  const handleAddLecture = () => {
    if (selectedLectureId) {
      lectureIds?.push(selectedLectureId);

      updateTrainingLecture({
        variables: {
          id: trainingId!,
          lectureIds: lectureIds!,
        },
      });
    }
  };

  return (
    <IconButton onClick={handleAddLecture}>
      {loadingUpdateTrainingLecture ? (
        <CircularProgress size={20} color="primary" />
      ) : (
        <AddIcon color="primary" />
      )}
    </IconButton>
  );
};

export default AddLecture;
