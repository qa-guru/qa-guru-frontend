import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Logout from "./Logout";
import Spinner from "../../../shared/Spinner";

const LogoutContainer: React.FC = () => {
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

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Spinner />;

  return (
    <Logout
      open={open}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      handleOk={handleOk}
      handleCancel={handleCancel}
      t={t}
    />
  );
};

export default LogoutContainer;
