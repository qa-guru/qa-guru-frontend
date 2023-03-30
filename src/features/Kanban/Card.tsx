import React from "react";
import { useDrag } from "react-dnd";
import { ICard } from "./interfaces";

interface CardProps {
  card: ICard;
  sourceColumnId: string;
}

const Card: React.FC<CardProps> = ({ card, sourceColumnId }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { id: card.id, sourceColumnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={dragRef}
      style={{
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "4px",
        marginBottom: "8px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
        opacity,
      }}
    >
      <h4>{card.title}</h4>
      <p>{card.description}</p>
    </div>
  );
};

export default Card;
