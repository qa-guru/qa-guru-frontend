import { FC } from "react";
import { useModal } from "react-modal-hook";
import { useResponsive } from "shared/hooks";
import { Dialog, DialogActions, IconButton, Tooltip } from "@mui/material";
import UserRow from "shared/components/user-row";
import { Menu } from "@mui/icons-material";
import { Maybe, UserDto } from "api/graphql/generated/graphql";

import {
  StyledClearIcon,
  StyledDialogContent,
  StyledWrapper,
} from "./user-settings.styled";
import { LockUser, Trainings, UnlockUser } from "../../containers";

interface IUserSettings {
  id: Maybe<string> | undefined;
  user: Maybe<UserDto>;
  locked?: Maybe<boolean>;
}

const UserSettings: FC<IUserSettings> = ({ id, user, locked }) => {
  const { isMobile } = useResponsive();

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} fullWidth>
      <StyledWrapper>
        <StyledClearIcon onClick={hideModal} fontSize="small" />
        <StyledDialogContent>
          <UserRow userId={id} user={user} date={user?.creationDate} hasLink />
        </StyledDialogContent>
        <Trainings />
        <DialogActions>
          {locked ? <UnlockUser id={id} /> : <LockUser id={id} />}
        </DialogActions>
      </StyledWrapper>
    </Dialog>
  ));

  const handleOpenModal = () => {
    showModal();
  };

  return (
    <Tooltip title="Настройка пользователя">
      <IconButton onClick={handleOpenModal}>
        <Menu fontSize={isMobile ? "small" : "medium"} color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default UserSettings;
