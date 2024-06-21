import { FC } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  UpdateLectureMutationFn,
  UpdateTrainingLectureMutationFn,
} from "api/graphql/generated/graphql";
import { CircularProgress } from "@mui/material";

import { StyledButton, StyledStack } from "./add-lecture.styled";

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

  const renderLoading = () => <CircularProgress size={40} />;
  const renderAddIcon = () => (
    <StyledStack>
      <StyledButton
        variant="contained"
        onClick={handleAddLecture}
        startIcon={<AddIcon />}
      >
        Создать новый
      </StyledButton>
    </StyledStack>
  );

  return loadingUpdateTrainingLecture ? renderLoading() : renderAddIcon();
};

export default AddLecture;
