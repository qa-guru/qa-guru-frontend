import { CircularProgress, IconButton } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  DeleteLectureMutationFn,
  Maybe,
  UpdateTrainingLectureMutationFn,
} from "api/graphql/generated/graphql";

interface IDeleteLecture {
  deleteLecture: DeleteLectureMutationFn;
  lectureIds?: string[];
  lectureId?: Maybe<string>;
  updateTrainingLecture: UpdateTrainingLectureMutationFn;
  loadingUpdateTrainingLecture: boolean;
}

const DeleteLecture: FC<IDeleteLecture> = ({
  deleteLecture,
  lectureIds,
  updateTrainingLecture,
  lectureId,
  loadingUpdateTrainingLecture,
}) => {
  const { trainingId } = useParams();

  const handleRemoveLecture = (lectureId: string | null | undefined) => {
    const newLectureIds = lectureIds?.filter((id) => id !== lectureId);

    updateTrainingLecture({
      variables: {
        id: trainingId!,
        lectureIds: newLectureIds,
      },
      onCompleted: () => {
        deleteLecture({
          variables: { id: lectureId! },
        });
      },
    });
  };

  const renderLoading = () => <CircularProgress size={25} />;
  const renderDeleteIcon = () => <RemoveIcon color="primary" />;

  return (
    <IconButton onClick={() => handleRemoveLecture(lectureId)}>
      {loadingUpdateTrainingLecture ? renderLoading() : renderDeleteIcon()}
    </IconButton>
  );
};

export default DeleteLecture;
