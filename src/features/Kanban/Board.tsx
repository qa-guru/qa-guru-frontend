import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IColumn } from "./interfaces";
import Column from "./Column";

interface BoardProps {
  columns: IColumn[];
}

const Board: React.FC<BoardProps> = ({ columns: initialColumns }) => {
  const [columns, setColumns] = useState(initialColumns);

  const moveCard = (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => {
    setColumns((prevColumns) => {
      const sourceColumnIndex = prevColumns.findIndex(
        (col) => col.id === sourceColumnId
      );
      const targetColumnIndex = prevColumns.findIndex(
        (col) => col.id === targetColumnId
      );
      const sourceColumn = prevColumns[sourceColumnIndex];
      const targetColumn = prevColumns[targetColumnIndex];

      const cardIndex = sourceColumn.cards.findIndex(
        (card) => card.id === cardId
      );
      const card = sourceColumn.cards[cardIndex];

      const newSourceColumn = { ...sourceColumn };
      newSourceColumn.cards.splice(cardIndex, 1);

      const newTargetColumn = { ...targetColumn };
      newTargetColumn.cards.push(card);

      const newColumns = [...prevColumns];
      newColumns[sourceColumnIndex] = newSourceColumn;
      newColumns[targetColumnIndex] = newTargetColumn;

      return newColumns;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "16px" }}>
        {columns.map((column) => (
          <Column key={column.id} column={column} onCardDrop={moveCard} />
        ))}
      </div>
    </DndProvider>
  );
};

export default Board;
