import React, { useEffect } from "react";
import { useModal } from "react-modal-hook";
import { Backdrop, Box, Dialog, DialogTitle } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { style } from "../styles";

const NoDataErrorMessage: React.FC = () => {
  const [showModal] = useModal(({ in: open }) => (
    <Dialog open={open}>
      <DialogTitle>Упс что-то пошло не так....</DialogTitle>
      <Box sx={style.icon}>
        <ReplayIcon cursor="pointer" onClick={reloadPage} />
      </Box>
    </Dialog>
  ));

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    showModal();
  }, [showModal]);

  return <Backdrop sx={style.backdropError} open={true} />;
};

export default NoDataErrorMessage;
