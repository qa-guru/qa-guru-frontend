import { FC, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";
import { useModal } from "react-modal-hook";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { CardType, IColumn } from "./column.types";
import {
  StyledButton,
  StyledCancelButton,
  StyledCardBox,
  StyledDialogContent,
  StyledInfiniteScroll,
  StyledLoadMoreButton,
  StyledRowStack,
  StyledStack,
  StyledTypographyCount,
  StyledTypographyStatus,
  StyledWrapper,
  StyledWrapperBoxCircle,
  StyledWrapperColumnBox,
  StyledWrapperColumnContainer,
} from "./column.styled";
import Card from "../card";
import { getColumnStyles } from "../../helpers/get-column-styles";
import { isColumnHighlight } from "../../helpers/is-column-highlight";
import { getFormattedStatus } from "../../helpers/get-formatted-status";

const Column: FC<IColumn> = ({
  column,
  onCardDrop,
  draggingState,
  setDraggingState,
  fetchMore,
  onCardClick,
  activeCardId,
}) => {
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);
  const [showButton, setShowButton] = useState<boolean>(true);
  const droppedItem = useRef<CardType | null>(null);
  const [{ isOver, canDrop }, dropRef] = useDrop({
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

  const handleOk = async () => {
    if (droppedItem.current) {
      await onCardDrop(
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

  const handleLoadMore = () => {
    setShowButton(false);
    fetchMore({
      variables: {
        offset: column.cards?.length,
      },
      updateQuery: (
        prev: { homeWorks: { items: StudentHomeWorkDto[] } },
        {
          fetchMoreResult,
        }: { fetchMoreResult: { homeWorks: { items: StudentHomeWorkDto[] } } }
      ) => {
        if (!fetchMoreResult) return prev;

        return {
          homeWorks: {
            ...fetchMoreResult.homeWorks,
            items: [
              ...prev.homeWorks.items,
              ...fetchMoreResult.homeWorks.items,
            ],
          },
        };
      },
    });
  };

  useEffect(() => {
    if (column.cards?.length >= column.totalElements) {
      setHasMoreHomeworks(false);
    }
  }, [column.cards?.length]);

  return (
    <StyledWrapperColumnBox>
      <StyledRowStack>
        <StyledTypographyStatus>
          {getFormattedStatus(column.title)}
        </StyledTypographyStatus>
        <StyledTypographyCount>
          {Number(column.totalElements) === 0
            ? "(empty)"
            : `(${column.totalElements})`}
        </StyledTypographyCount>
      </StyledRowStack>
      <StyledWrapperColumnContainer
        id={`scroll-container-${column.id}`}
        ref={dropRef}
        showButton={showButton}
        sx={{
          ...getColumnStyles(
            column.id,
            draggingState,
            canDrop,
            column.totalElements,
            isOver
          ),
        }}
      >
        <StyledInfiniteScroll
          dataLength={column.cards?.length}
          next={handleLoadMore}
          hasMore={hasMoreHomeworks}
          loader={
            <StyledWrapperBoxCircle>
              <CircularProgress size={25} />
            </StyledWrapperBoxCircle>
          }
          scrollableTarget={`scroll-container-${column.id}`}
        >
          {column.cards?.map((card, index) => (
            <StyledCardBox key={`${card.id}-${index}`}>
              <Card
                card={card}
                sourceColumnId={column.id}
                setDraggingState={setDraggingState}
                isCardsHidden={isColumnHighlight(column.id, draggingState)}
                onCardClick={() => onCardClick!(card)}
                isActive={activeCardId === card.id}
              />
            </StyledCardBox>
          ))}
        </StyledInfiniteScroll>
      </StyledWrapperColumnContainer>
      {showButton && hasMoreHomeworks && (
        <StyledLoadMoreButton onClick={handleLoadMore}>
          Загрузить еще
        </StyledLoadMoreButton>
      )}
    </StyledWrapperColumnBox>
  );
};

export default Column;
