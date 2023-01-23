import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ILogout } from "./Logout.types";

const Logout: React.FC<ILogout> = (props) => {
  const { open, handleClickOpen, handleClose, handleCancel, handleOk, t } =
    props;

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <ExitToAppIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("sign.out")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("logout.confirm")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{t("no")}</Button>
          <Button onClick={handleOk} autoFocus>
            {t("yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;
