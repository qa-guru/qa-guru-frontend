import { FC, useRef } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModal } from "react-modal-hook";
import { Maybe } from "api/graphql/generated/graphql";

import { IDeleteTraining } from "./delete-training.types";
import {
  StyledButton,
  StyledConfirmButton,
  StyledDialogContent,
  StyledStack,
  StyledWrapper,
} from "./delete-training.styled";

const DeleteTraining: FC<IDeleteTraining> = ({
  deleteTraining,
  trainingId,
  loadingDeleteTraining,
}) => {
  const trainingIdRef = useRef<Maybe<string>>(trainingId);

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
            <StyledConfirmButton
              variant="contained"
              onClick={handleDeleteTraining}
            >
              Да
            </StyledConfirmButton>
          </StyledStack>
        </DialogActions>
      </StyledWrapper>
    </Dialog>
  ));

  const handleOpen = () => {
    trainingIdRef.current = trainingId;
    showModal();
  };

  const handleCancel = () => {
    trainingIdRef.current = null;
    hideModal();
  };

  const handleDeleteTraining = async () => {
    if (trainingIdRef.current) {
      await deleteTraining({
        variables: { id: trainingIdRef.current },
      });

      trainingIdRef.current = null;
      hideModal();
    }
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
