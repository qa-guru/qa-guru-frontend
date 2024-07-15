import { FC } from "react";
import { useModal } from "react-modal-hook";
import { useResponsive } from "shared/hooks";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import UserRow from "shared/components/user-row";
import { Menu } from "@mui/icons-material";
import { Maybe, UserDto } from "api/graphql/generated/graphql";

import {
  StyledClearIcon,
  StyledDialogActions,
  StyledDialogContent,
  StyledPaper,
  StyledTypography,
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

  const [showModal, hideModal] = useModal(
    ({ in: open }) => (
      <Dialog open={open} onClose={hideModal} fullWidth scroll="body">
        <StyledWrapper>
          <StyledClearIcon onClick={hideModal} fontSize="small" />
          <StyledDialogContent>
            <UserRow
              userId={id}
              user={user}
              date={user?.creationDate}
              hasLink
            />
            <StyledPaper>
              <StyledTypography variant="h4">Доступные курсы</StyledTypography>
              <Trainings user={user} id={id} />
            </StyledPaper>
          </StyledDialogContent>
          <StyledDialogActions>
            {locked ? <UnlockUser id={id} /> : <LockUser id={id} />}
          </StyledDialogActions>
        </StyledWrapper>
      </Dialog>
    ),
    [locked]
  );

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
