import {
  CircularProgress,
  Dialog,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useRef } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DeleteLectureMutationFn,
  Maybe,
  UpdateTrainingLectureMutationFn,
} from "api/graphql/generated/graphql";
import { useModal } from "react-modal-hook";
import { client } from "api";

import {
  StyledButton,
  StyledConfirmButton,
  StyledDialogContent,
  StyledStack,
  StyledWrapper,
} from "./delete-lecture.styled";

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
  const lectureIdRef = useRef<Maybe<string | undefined>>(lectureId);

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xs">
      <StyledWrapper>
        <StyledDialogContent>
          <Typography variant="h4">
            Вы уверены, что хотите удалить лекцию?
          </Typography>
        </StyledDialogContent>
        <DialogActions>
          <StyledStack>
            <StyledButton
              color="secondary"
              variant="contained"
              onClick={handleCancel}
            >
              Нет
            </StyledButton>
            <StyledConfirmButton
              variant="contained"
              onClick={handleDeleteLecture}
            >
              Да
            </StyledConfirmButton>
          </StyledStack>
        </DialogActions>
      </StyledWrapper>
    </Dialog>
  ));

  const handleOpen = () => {
    lectureIdRef.current = lectureId;
    showModal();
  };

  const handleCancel = () => {
    lectureIdRef.current = null;
    hideModal();
  };

  const handleDeleteLecture = async () => {
    console.log(lectureIdRef.current);

    if (lectureIdRef.current) {
      const newLectureIds = lectureIds?.filter(
        (id) => id !== lectureIdRef.current
      );

      await deleteLecture({
        variables: { id: lectureIdRef.current },
        onCompleted: () => {
          updateTrainingLecture({
            variables: {
              id: trainingId!,
              lectureIds: newLectureIds,
            },
          });
          client.refetchQueries({ include: ["trainingLectures"] });
        },
      });

      lectureIdRef.current = null;
      hideModal();
    }
  };

  const renderLoading = () => <CircularProgress size={25} />;
  const renderDeleteIcon = () => <DeleteIcon color="error" fontSize="small" />;

  return (
    <IconButton onClick={handleOpen}>
      {loadingUpdateTrainingLecture ? renderLoading() : renderDeleteIcon()}
    </IconButton>
  );
};

export default DeleteLecture;
