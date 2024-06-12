import { FC } from "react";
import useCardDrop from "shared/hooks/use-card-drop";
import ColumnContent from "shared/components/column-content/column-content";
import { useTheme } from "@mui/material/styles";

import { IColumn } from "./column.types";
import { StyledCardBox } from "./column.styled";
import Card from "../card";
import { getColumnStyles } from "../../helpers/get-column-styles";
import { isColumnHighlight } from "../../helpers/is-column-highlight";

const Column: FC<IColumn> = ({
  column,
  onCardDrop,
  draggingState,
  setDraggingState,
  fetchMore,
  onCardClick,
  activeCardId,
}) => {
  const { dropRef, isOver, canDrop } = useCardDrop({ column, onCardDrop });

  const theme = useTheme();
  const columnStyles = {
    ...getColumnStyles(
      column.id,
      draggingState,
      canDrop,
      column.totalElements,
      isOver
    ),
    height: "calc(100vh - 252px)",
    [theme.breakpoints.down("md")]: {
      height: "calc(100dvh - 269px)",
    },
    [theme.breakpoints.only("xs")]: {
      height: "calc(100dvh - 244px)",
    },
  };

  return (
    <ColumnContent
      column={column}
      fetchMore={fetchMore}
      dropRef={dropRef}
      isOver={isOver}
      canDrop={canDrop}
      draggingState={draggingState}
      columnStyles={columnStyles}
    >
      {column.cards?.map((card, index) => (
        <StyledCardBox key={`${card.id}-${index}`}>
          <Card
            card={card}
            sourceColumnId={column.id}
            setDraggingState={setDraggingState}
            isCardsHidden={isColumnHighlight(column.id, draggingState)}
            onCardClick={(event) => onCardClick?.(card, event)}
            isActive={activeCardId === card.id}
          />
        </StyledCardBox>
      ))}
    </ColumnContent>
  );
};

export default Column;
