import { FC, useEffect } from "react";
import { useModal } from "react-modal-hook";
import { Dialog, DialogTitle } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

import {
  StyledBackdropError,
  StyledIconBox,
} from "./no-data-error-message.styled";

const NoDataErrorMessage: FC = () => {
  const [showModal] = useModal(({ in: open }) => (
    <Dialog open={open}>
      <DialogTitle>Упс что-то пошло не так....</DialogTitle>
      <StyledIconBox>
        <ReplayIcon cursor="pointer" onClick={reloadPage} />
      </StyledIconBox>
    </Dialog>
  ));

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    showModal();
  }, [showModal]);

  return <StyledBackdropError open={true} />;
};

export default NoDataErrorMessage;
