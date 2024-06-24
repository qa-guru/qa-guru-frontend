import { FC } from "react";
import { Lock, Menu } from "@mui/icons-material";
import { Dialog, DialogActions, IconButton, Tooltip } from "@mui/material";
import { useModal } from "react-modal-hook";
import { useResponsive } from "shared/hooks";
import UserRow from "shared/components/user-row";

import {
  StyledCancelButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledWrapper,
} from "./lock-user.styled";
import { ILockUser } from "./lock-user.types";

const LockUser: FC<ILockUser> = ({ lockUser, id, user }) => {
  const { isMobile } = useResponsive();
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xs">
      <StyledWrapper>
        <StyledClearIcon onClick={hideModal} fontSize="small" />
        <StyledDialogContent>
          <UserRow userId={id} user={user} date={user?.creationDate} hasLink />
        </StyledDialogContent>
        <DialogActions>
          <StyledCancelButton
            variant="outlined"
            onClick={handleLock}
            startIcon={<Lock color="primary" fontSize="small" />}
          >
            Заблокировать пользователя
          </StyledCancelButton>
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
        <Menu fontSize={isMobile ? "small" : "medium"} color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default LockUser;
