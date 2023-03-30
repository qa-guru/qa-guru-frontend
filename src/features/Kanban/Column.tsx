import React from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import { IColumn, ICard } from "./interfaces";

interface ColumnProps {
  column: IColumn;
  onCardDrop: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
}

const Column: React.FC<ColumnProps> = ({ column, onCardDrop }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "card",
    drop: (item: { id: string; sourceColumnId: string }) => {
      onCardDrop(item.id, item.sourceColumnId, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const backgroundColor = isOver ? "#e0e0e0" : "#f0f0f0";

  return (
    <div
      ref={dropRef}
      style={{
        backgroundColor,
        padding: "8px",
        borderRadius: "4px",
        width: "250px",
      }}
    >
      <h3>{column.title}</h3>
      {column.cards.map((card) => (
        <Card key={card.id} card={card} sourceColumnId={column.id} />
      ))}
    </div>
  );
};

export default Column;
