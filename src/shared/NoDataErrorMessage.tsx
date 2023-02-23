import React, { useEffect } from "react";
import { useModal } from "react-modal-hook";
import { Backdrop, Box, Dialog, DialogTitle } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

const style = {
  icon: { display: "flex", justifyContent: "center", pb: "20px" },
};

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

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    ></Backdrop>
  );
};

export default NoDataErrorMessage;
