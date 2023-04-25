import React from "react";
import { useDrop } from "react-dnd";
import { Box, Typography } from "@mui/material";
import { IColumn } from "./Column.types";
import Card from "../Card/Card";
import { getColumnStyles } from "../../helpers/getColumnStyles";
import { isColumnHighlight } from "../../helpers/isColumnHighlight";

const Column: React.FC<IColumn> = ({
  column,
  onCardDrop,
  draggingState,
  setDraggingState,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "card",
    drop: (item: {
      id: string;
      sourceColumnId: string;
      allowedColumns: string[];
    }) => {
      if (item.allowedColumns.includes(column.id!)) {
        onCardDrop(item.id, item.sourceColumnId, column.id!);
      }
    },
    canDrop: (item: { allowedColumns: string[] }) =>
      item.allowedColumns.includes(column.id!),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Box width="25%" flexGrow="1" display="flex" flexDirection="column">
      <Typography variant="h6">{column.title}</Typography>
      <Box
        ref={dropRef}
        flexGrow="1"
        sx={getColumnStyles(column.id, draggingState, isOver)}
      >
        {column.cards?.map((card) => (
          <Card
            key={card.id}
            card={card}
            sourceColumnId={column.id}
            allowedColumns={card.allowedColumns}
            setDraggingState={setDraggingState}
            isCardsHidden={isColumnHighlight(column.id, draggingState)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Column;
