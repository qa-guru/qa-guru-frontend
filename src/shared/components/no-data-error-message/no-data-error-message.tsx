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
  const navigate = useNavigate();

  const handleReloadPage = () => {
    window.location.reload();
  };

  const handleNavigateToHomePage = () => {
    navigate("/");
  };

  const [showModal] = useModal(({ in: open }) => (
    <Dialog open={open}>
      <DialogTitle>Упс что-то пошло не так...</DialogTitle>
      <StyledIconStack>
        <Replay cursor="pointer" color="primary" onClick={handleReloadPage} />
        <Home
          cursor="pointer"
          color="primary"
          onClick={handleNavigateToHomePage}
        />
      </StyledIconStack>
    </Dialog>
  ));

  useEffect(() => {
    showModal();
  }, [showModal]);

  return <StyledBackdropError open={true} />;
};

export default NoDataErrorMessage;
