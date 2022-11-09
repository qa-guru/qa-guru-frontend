import axios from "axios";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
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
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { ILogout } from "./Logout.types";

const Logout: React.FC<ILogout> = ({ setIsLoading }) => {
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    try {
      setIsLoading(true);
      const response = await logout();
      setOpen(false);
      if (response.status !== 200) {
        setIsLoading(false);
        enqueueSnackbar(t("logout.unknownError"));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        enqueueSnackbar(t("logout.unknownError"));
      }
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
