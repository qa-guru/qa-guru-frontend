import { FC } from "react";
import {
  Dialog,
  DialogActions,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTranslation } from "react-i18next";
import { useModal } from "react-modal-hook";
import { ILogout } from "./logout.types";
import {
  StyledButton,
  StyledCancelButton,
  StyledDialogContent,
  StyledItemStack,
  StyledStack,
  StyledWrapper,
} from "./logout.styled";

const Logout: FC<ILogout> = (props) => {
  const { logout, setAnchorElUser } = props;
  const { t } = useTranslation();
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal}>
      <StyledWrapper>
        <StyledDialogContent>
          <Typography variant="h4">{t("logout.confirm")}</Typography>
        </StyledDialogContent>
        <DialogActions>
          <StyledStack>
            <StyledCancelButton
              color="secondary"
              variant="contained"
              onClick={handleCancel}
            >
              {t("no")}
            </StyledCancelButton>
            <StyledButton variant="contained" onClick={handleOk}>
              {t("yes")}
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
    <>
      <MenuItem onClick={handleClickOpen}>
        <StyledItemStack>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText secondary="Выход" />
        </StyledItemStack>
      </MenuItem>
    </>
  );
};

export default Logout;
