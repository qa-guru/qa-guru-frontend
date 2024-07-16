import { FC } from "react";
import {
  Dialog,
  DialogActions,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useModal } from "react-modal-hook";

import { ILogout } from "./logout.types";
import {
  StyledButton,
  StyledCancelButton,
  StyledDialogContent,
  StyledItemStack,
  StyledMenuItem,
  StyledStack,
  StyledWrapper,
} from "./logout.styled";

const Logout: FC<ILogout> = (props) => {
  const { logout, setAnchorElUser } = props;
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal}>
      <StyledWrapper>
        <StyledDialogContent>
          <Typography variant="h4">Вы действительно хотите выйти?</Typography>
        </StyledDialogContent>
        <DialogActions>
          <StyledStack>
            <StyledCancelButton
              color="secondary"
              variant="contained"
              onClick={handleCancel}
            >
              нет
            </StyledCancelButton>
            <StyledButton variant="contained" onClick={handleOk}>
              да
            </StyledButton>
          </StyledStack>
        </DialogActions>
      </StyledWrapper>
    </Dialog>
  ));

  const handleClickOpen = () => {
    setAnchorElUser(null);
    showModal();
  };

  const handleOk = async () => {
    await logout();
    hideModal();
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <StyledMenuItem onClick={handleClickOpen}>
      <StyledItemStack>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText secondary="Выход" />
      </StyledItemStack>
    </StyledMenuItem>
  );
};

export default Logout;
