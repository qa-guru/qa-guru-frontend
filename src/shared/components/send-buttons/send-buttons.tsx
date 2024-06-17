import { FC } from "react";
import { Button } from "@mui/material";
import { Clear, Send } from "@mui/icons-material";

import {
  StyledButtonStack,
  StyledIconButton,
  StyledLoadingButton,
} from "./send-buttons.styled";
import { useResponsive } from "../../hooks";
import { ISendButtons } from "./send-buttons.types";

const SendButtons: FC<ISendButtons> = ({
  onReply,
  onCancel,
  hideCancel,
  loading,
}) => {
  const { isMobileOrTablet } = useResponsive();

  const renderCancelButton = () => {
    if (hideCancel) return null;

    return isMobileOrTablet ? (
      <StyledIconButton onClick={onCancel}>
        <Clear color="primary" fontSize="small" />
      </StyledIconButton>
    ) : (
      <Button color="secondary" variant="contained" onClick={onCancel}>
        Отменить
      </Button>
    );
  };

  const renderSendButton = () =>
    isMobileOrTablet ? (
      <StyledIconButton onClick={onReply}>
        <Send color="primary" fontSize="small" />
      </StyledIconButton>
    ) : (
      <StyledLoadingButton
        variant="contained"
        onClick={onReply}
        loading={loading}
      >
        Отправить
      </StyledLoadingButton>
    );

  return (
    <StyledButtonStack>
      {renderCancelButton()}
      {renderSendButton()}
    </StyledButtonStack>
  );
};

export default SendButtons;
