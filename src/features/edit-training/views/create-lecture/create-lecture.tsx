import { FC } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import { generateUniqueId } from "shared/helpers";

import { StyledButton } from "./create-lecture.styled";
import { ICreateLecture } from "./create-lecture.types";

const CreateLecture: FC<ICreateLecture> = ({
  updateLecture,
  lectureIds,
  updateTrainingLecture,
  loadingUpdateTrainingLecture,
}) => {
  const { trainingId } = useParams();

  const handleAddLecture = () => {
    const lectureeName = `Урок ${generateUniqueId()}`;

    updateLecture({
      variables: {
        input: {
          subject: lectureeName,
        },
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
      disabled={loadingUpdateTrainingLecture}
      startIcon={
        loadingUpdateTrainingLecture ? (
          <CircularProgress size={20} color="primary" />
        ) : (
          <AddIcon />
        )
      }
    >
      Создать новый
    </StyledButton>
  );
};

export default CreateLecture;
