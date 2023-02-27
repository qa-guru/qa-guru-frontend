import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTranslation } from "react-i18next";
import { useModal } from "react-modal-hook";
import { ILogout } from "./Logout.types";

const Logout: React.FC<ILogout> = (props) => {
  const { logout, setAnchorElUser } = props;
  const { t } = useTranslation();
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("sign.out")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("logout.confirm")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleOk}>
          {t("yes")}
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          {t("no")}
        </Button>
      </DialogActions>
    </Dialog>
  ));

  const handleClickOpen = () => {
    setAnchorElUser(null);
    showModal();
  };

  const handleClose = () => {
    hideModal();
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
        <ListItemText>Выход</ListItemText>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
      </MenuItem>
    </>
  );
};

export default Logout;
