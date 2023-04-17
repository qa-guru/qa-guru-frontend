import React, { useMemo } from "react";
import { useDrop } from "react-dnd";
import { Box, Typography } from "@mui/material";
import { IColumn } from "./Column.types";
import Card from "../Card/Card";
import { primary } from "../../../../../theme/colors";

const Column: React.FC<IColumn> = ({
  column,
  onCardDrop,
  isDraggingNewItem,
  setIsDraggingNewItem,
  isDraggingFromInReview,
  setIsDraggingFromInReview,
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

  const columnStyles = useMemo(() => {
    if (
      (column.id === "2" && isDraggingNewItem) ||
      (["3", "4"].includes(column.id) && isDraggingFromInReview)
    ) {
      return {
        border: "2px dashed",
        borderColor: primary.main,
        backgroundColor: isOver ? primary.secondary : null,
        padding: "6px",
        borderRadius: "4px",
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      };
    }
    return null;
  }, [column.id, isDraggingNewItem, isDraggingFromInReview, isOver]);

  return (
    <Box width="25%" flexGrow="1" display="flex" flexDirection="column">
      <Typography variant="h6">{column.title}</Typography>
      <Box ref={dropRef} flexGrow="1" sx={columnStyles}>
        {column.cards?.map((card) => (
          <Card
            key={card.id}
            card={card}
            sourceColumnId={column.id}
            allowedColumns={card.allowedColumns}
            setIsDraggingNewItem={setIsDraggingNewItem}
            setIsDraggingFromInReview={setIsDraggingFromInReview}
            isCardsHidden={
              (column.id === "2" && isDraggingNewItem) ||
              (["3", "4"].includes(column.id) && isDraggingFromInReview)
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default Column;
