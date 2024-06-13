import { LockUserMutationFn, Maybe } from "api/graphql/generated/graphql";
import { FC } from "react";
import { Lock } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useModal } from "react-modal-hook";
import { useResponsive } from "shared/hooks";

import {
  StyledButton,
  StyledCancelButton,
  StyledDialogContent,
  StyledStack,
  StyledWrapper,
} from "./lock-user.styled";

interface ILockUser {
  lockUser: LockUserMutationFn;
  id: Maybe<string> | undefined;
}

const LockUser: FC<ILockUser> = ({ lockUser, id }) => {
  const { isMobile } = useResponsive();
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xs">
      <StyledWrapper>
        <StyledDialogContent>
          <Typography variant="h4">
            Вы уверены, что хотите заблокировать пользователя?
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
            <StyledCancelButton variant="contained" onClick={handleLock}>
              Да
            </StyledCancelButton>
          </StyledStack>
        </DialogActions>
      </StyledWrapper>
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
        <Lock fontSize={isMobile ? "small" : "medium"} color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default LockUser;
