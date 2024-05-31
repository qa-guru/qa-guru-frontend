import { FC, useEffect } from "react";
import { useModal } from "react-modal-hook";
import { Dialog, DialogTitle } from "@mui/material";
import { Replay, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  StyledBackdropError,
  StyledIconStack,
} from "./no-data-error-message.styled";

const NoDataErrorMessage: FC = () => {
  const [showModal] = useModal(({ in: open }) => (
    <Dialog open={open}>
      <DialogTitle>Упс что-то пошло не так...</DialogTitle>
      <StyledIconStack>
        <Replay cursor="pointer" color="primary" onClick={reloadPage} />
        <Home cursor="pointer" color="primary" onClick={toHomePage} />
      </StyledIconStack>
    </Dialog>
  ));

  const navigate = useNavigate();

  const reloadPage = () => {
    window.location.reload();
  };

  const toHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    showModal();
  }, [showModal]);

  return <StyledBackdropError open={true} />;
};

export default NoDataErrorMessage;
