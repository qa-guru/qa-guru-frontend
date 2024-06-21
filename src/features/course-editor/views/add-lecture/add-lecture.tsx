import { FC } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  UpdateLectureMutationFn,
  UpdateTrainingLectureMutationFn,
} from "api/graphql/generated/graphql";
import { CircularProgress } from "@mui/material";

import { StyledButton } from "./add-lecture.styled";

interface IAddLecture {
  updateLecture: UpdateLectureMutationFn;
  lectureIds?: string[];
  updateTrainingLecture: UpdateTrainingLectureMutationFn;
  loadingUpdateTrainingLecture: boolean;
}

const AddLecture: FC<IAddLecture> = ({
  updateLecture,
  lectureIds,
  updateTrainingLecture,
  loadingUpdateTrainingLecture,
}) => {
  const { trainingId } = useParams();

  const handleAddLecture = () => {
    updateLecture({
      variables: {
        input: {},
      },
      onCompleted: (result) => {
        lectureIds?.push(result?.updateLecture?.id!);

        updateTrainingLecture({
          variables: {
            id: trainingId!,
            lectureIds: lectureIds!,
          },
        });
      },
    });
  };

  return (
    <StyledButton
      variant="contained"
      onClick={handleAddLecture}
      startIcon={
        loadingUpdateTrainingLecture ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          <AddIcon />
        )
      }
    >
      Создать новый
    </StyledButton>
  );
};

export default AddLecture;
