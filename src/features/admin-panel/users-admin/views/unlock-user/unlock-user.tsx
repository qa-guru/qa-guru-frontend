import { FC } from "react";
import { LockOpen, Menu } from "@mui/icons-material";
import { Dialog, DialogActions, IconButton, Tooltip } from "@mui/material";
import UserRow from "shared/components/user-row";
import { useResponsive } from "shared/hooks";
import { useModal } from "react-modal-hook";

import {
  StyledCancelButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledWrapper,
} from "../lock-user/lock-user.styled";
import { IUnlockUser } from "./unlock-user.types";

const UnlockUser: FC<IUnlockUser> = ({ unlockUser, id, user }) => {
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
            onClick={handleLockOpen}
            startIcon={<LockOpen color="primary" fontSize="small" />}
          >
            Разблокировать пользователя
          </StyledCancelButton>
        </DialogActions>
      </StyledWrapper>
    </Dialog>
  ));

  const handleOpenModal = () => {
    showModal();
  };

  const handleLockOpen = () => {
    if (id)
      unlockUser({
        variables: { id },
      });

    hideModal();
  };

  return (
    <Tooltip title="Разблокировать">
      <IconButton onClick={handleOpenModal}>
        <Menu fontSize={isMobile ? "small" : "medium"} color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default UnlockUser;
