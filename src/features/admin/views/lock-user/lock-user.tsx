import { LockUserMutationFn, Maybe } from "api/graphql/generated/graphql";
import { FC } from "react";
import { Lock } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useModal } from "react-modal-hook";
import { StyledDialogContent, StyledStack } from "./lock-user.styled";

interface ILockUser {
  lockUser: LockUserMutationFn;
  id: Maybe<string> | undefined;
}

const LockUser: FC<ILockUser> = ({ lockUser, id }) => {
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xs">
      <StyledDialogContent>
        <Typography variant="h4">
          Вы уверенны, что хотите заблокировать пользователя?
        </Typography>
      </StyledDialogContent>
      <DialogActions>
        <StyledStack>
          <Button color="secondary" variant="contained" onClick={handleCancel}>
            Нет
          </Button>
          <Button variant="contained" onClick={handleLock}>
            Да
          </Button>
        </StyledStack>
      </DialogActions>
    </Dialog>
  ));

  const handleOpenModal = () => {
    showModal();
  };

  const handleLock = async () => {
    if (id)
      await lockUser({
        variables: { id },
      });

    hideModal();
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <Tooltip title="Заблокировать">
      <IconButton onClick={handleOpenModal}>
        <Lock color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default LockUser;
