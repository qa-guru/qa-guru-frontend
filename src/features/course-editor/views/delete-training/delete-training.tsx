import { FC } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModal } from "react-modal-hook";

import { IDeleteTraining } from "./delete-training.types";
import {
  StyledButton,
  StyledCancelButton,
  StyledDialogContent,
  StyledStack,
  StyledWrapper,
} from "./delete-training.styled";

const DeleteTraining: FC<IDeleteTraining> = ({
  deleteTraining,
  trainingId,
  loadingDeleteTraining,
}) => {
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xs">
      <StyledWrapper>
        <StyledDialogContent>
          <Typography variant="h4">
            Вы уверены, что хотите удалить курс?
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
            <StyledCancelButton
              variant="contained"
              onClick={handleDeleteTraining}
            >
              Да
            </StyledCancelButton>
          </StyledStack>
        </DialogActions>
      </StyledWrapper>
    </Dialog>
  ));

  const handleOpen = () => {
    showModal();
  };

  const handleCancel = () => {
    hideModal();
  };

  const handleDeleteTraining = async () => {
    if (trainingId)
      await deleteTraining({
        variables: { id: trainingId },
      });

    hideModal();
  };

  const renderLoading = () => <CircularProgress size={20} />;
  const renderDeleteIcon = () => <DeleteIcon fontSize="small" color="error" />;

  return (
    <IconButton onClick={handleOpen}>
      {loadingDeleteTraining ? renderLoading() : renderDeleteIcon()}
    </IconButton>
  );
};

export default DeleteTraining;
