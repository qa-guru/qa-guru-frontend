import React, { FC } from "react";
import { useModal } from "react-modal-hook";
import { Dialog, DialogActions, Typography } from "@mui/material";

import { IDeleteComment } from "./delete-comment.types";
import {
  StyledDeleteIcon,
  StyledIconButton,
  StyledButton,
  StyledCancelButton,
  StyledDialogContent,
  StyledStack,
  StyledWrapper,
} from "./delete-comment.styled";

const DeleteComment: FC<IDeleteComment> = ({ id, deleteComment }) => {
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal}>
      <StyledWrapper>
        <StyledDialogContent>
          <Typography variant="h5">
            Вы уверены, что хотите удалить комментарий?
          </Typography>
        </StyledDialogContent>
        <DialogActions>
          <StyledStack>
            <StyledCancelButton
              color="secondary"
              variant="contained"
              onClick={handleCancel}
            >
              Нет
            </StyledCancelButton>
            <StyledButton variant="contained" onClick={handleDelete}>
              Да
            </StyledButton>
          </StyledStack>
        </DialogActions>
      </StyledWrapper>
    </Dialog>
  ));

  const handleCancel = () => {
    hideModal();
  };

  const handleDelete = async () => {
    if (id) {
      await deleteComment({
        variables: { id },
      });
    }
  };

  return (
    <StyledIconButton onClick={() => showModal()}>
      <StyledDeleteIcon />
    </StyledIconButton>
  );
};

export default DeleteComment;
