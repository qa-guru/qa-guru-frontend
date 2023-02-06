import React, { useState } from "react";
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
import { ILogout } from "./Logout.types";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";

const Logout: React.FC<ILogout> = (props) => {
  const { logout, isLoading, setAnchorElUser } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setAnchorElUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    await logout();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemText>Выход</ListItemText>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("sign.out")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("logout.confirm")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleOk} loading={isLoading}>
            {t("yes")}
          </LoadingButton>
          <Button onClick={handleCancel}>{t("no")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;
