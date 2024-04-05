import { FC, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";
import { useModal } from "react-modal-hook";
import { Maybe, StudentHomeWorkDto } from "api/graphql/generated/graphql";
import useResponsive from "shared/hooks/use-responsive";

import { CardType, IColumn } from "./column.types";
import {
  StyledBoxWrapper,
  StyledButton,
  StyledCancelButton,
  StyledCardBox,
  StyledDialogContent,
  StyledInfiniteScroll,
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
import {
  HOMEWORKS_QUERY_DEFAULTS,
  MAX_CARDS_BEFORE_SHOW_MORE,
} from "../../constants";

interface DropCollectedProps {
  isOver: boolean;
  canDrop: boolean;
}

const Column: FC<IColumn> = ({
  column,
  onCardDrop,
  draggingState,
  setDraggingState,
  fetchMore,
  onCardClick,
  activeCardId,
}) => {
  const { isMobileOrTablet } = useResponsive();
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);
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

  const isTotalElements = column.cards?.length >= column.totalElements;
  const isMaxLimit = column.cards?.length >= HOMEWORKS_QUERY_DEFAULTS.MAX;
  const shouldShowLoadMoreButton =
    column.cards?.length <= MAX_CARDS_BEFORE_SHOW_MORE;

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

  const handleLoadMore = () => {
    if (isMaxLimit) {
      setHasMoreHomeworks(false);
      return;
    }
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
    if (isTotalElements || isMaxLimit) {
      setHasMoreHomeworks(false);
    }
  }, [column.cards?.length, column.totalElements]);

  return (
    <StyledWrapperColumnBox>
      {!isMobileOrTablet && (
        <StyledRowStack>
          <StyledTypographyStatus variant="h4">
            {getFormattedStatus(column.title)}
          </StyledTypographyStatus>
          <StyledTypographyCount variant="h4">
            {Number(column.totalElements) === 0
              ? "(0)"
              : `(${column.totalElements})`}
          </StyledTypographyCount>
        </StyledRowStack>
      )}
      <StyledWrapperColumnContainer
        id={`scroll-container-${column.id}`}
        ref={dropRef}
        sx={{
          ...(getColumnStyles(
            column.id,
            draggingState,
            canDrop,
            column.totalElements,
            isOver
          ) as {}),
        }}
      >
        <StyledInfiniteScroll
          dataLength={column.cards?.length}
          next={handleLoadMore}
          hasMore={hasMoreHomeworks}
          loader={
            <StyledWrapperBoxCircle>
              <CircularProgress size={20} />
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
                onCardClick={() => onCardClick?.(card)}
                isActive={activeCardId === card.id}
              />
            </StyledCardBox>
          ))}
          <StyledBoxWrapper>
            {hasMoreHomeworks && shouldShowLoadMoreButton && (
              <Button onClick={handleLoadMore}>Загрузить еще</Button>
            )}
          </StyledBoxWrapper>
        </StyledInfiniteScroll>
      </StyledWrapperColumnContainer>
    </StyledWrapperColumnBox>
  );
};

export default Column;
