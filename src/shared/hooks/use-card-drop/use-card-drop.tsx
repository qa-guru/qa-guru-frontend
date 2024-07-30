import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useModal } from "react-modal-hook";
import { Dialog, DialogActions, Typography } from "@mui/material";

import { CardType } from "features/kanban/views/column/column.types";
import { Maybe } from "api/graphql/generated/graphql";

import {
  StyledButton,
  StyledCancelButton,
  StyledDialogContent,
  StyledStack,
  StyledWrapper,
} from "./use-card-drop.styled";
import { DropCollectedProps, IUseCardDrop } from "./use-card-drop.types";

const useCardDrop = ({ column, onCardDrop }: IUseCardDrop) => {
  const droppedItem = useRef<Maybe<CardType>>(null);

  const [{ isOver, canDrop }, dropRef] = useDrop<
    CardType,
    void,
    DropCollectedProps
  >({
    accept: "card",
    drop: (item: CardType) => {
      if (item.allowedColumns.includes(column.id)) {
        droppedItem.current = item;
        showModal();
      }
    },

    canDrop: (item: { allowedColumns: string[] }) =>
      item.allowedColumns.includes(column.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal}>
      <StyledWrapper>
        <StyledDialogContent>
          <Typography variant="h5">
            Вы уверены, что хотите поменять статус данной домашней работы?
          </Typography>
        </StyledDialogContent>
        <DialogActions>
          <StyledStack>
            <StyledCancelButton
              color="secondary"
              variant="contained"
              onClick={handleCancel}
            >
              Нет
            </StyledCancelButton>
            <StyledButton variant="contained" onClick={handleOk}>
              Да
            </StyledButton>
          </StyledStack>
        </DialogActions>
      </StyledWrapper>
    </Dialog>
  ));

  const handleOk = () => {
    if (droppedItem.current) {
      onCardDrop(
        droppedItem.current.id,
        droppedItem.current.sourceColumnId,
        column.id
      );
      droppedItem.current = null;
      hideModal();

      const containerElement = document.getElementById(
        `scroll-container-${column.id}`
      );
      if (containerElement) {
        containerElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const handleCancel = () => {
    droppedItem.current = null;
    hideModal();
  };

  return {
    dropRef,
    isOver,
    canDrop,
  };
};

export default useCardDrop;
