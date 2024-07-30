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
import { useModal } from "react-modal-hook";

import {
  Maybe,
  UpdateTrainingLectureMutationFn,
} from "api/graphql/generated/graphql";

import {
  StyledButton,
  StyledConfirmButton,
  StyledDialogContent,
  StyledStack,
  StyledWrapper,
} from "./delete-lecture.styled";

interface IDeleteLecture {
  lectureIds?: string[];
  lectureId?: Maybe<string>;
  updateTrainingLecture: UpdateTrainingLectureMutationFn;
  loadingUpdateTrainingLecture: boolean;
}

const DeleteLecture: FC<IDeleteLecture> = ({
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
            Вы уверены, что хотите удалить лекцию из курса?
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

  const handleDeleteLecture = () => {
    if (lectureIdRef.current) {
      const newLectureIds = lectureIds?.filter(
        (id) => id !== lectureIdRef.current
      );

      updateTrainingLecture({
        variables: {
          id: trainingId!,
          lectureIds: newLectureIds,
        },
      });

      lectureIdRef.current = null;
      hideModal();
    }
  };

  const renderLoading = () => <CircularProgress size={25} />;
  const renderDeleteIcon = () => <DeleteIcon fontSize="small" color="error" />;

  return (
    <IconButton onClick={handleOpen}>
      {loadingUpdateTrainingLecture ? renderLoading() : renderDeleteIcon()}
    </IconButton>
  );
};

export default DeleteLecture;
