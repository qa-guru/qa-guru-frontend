import { FC } from "react";
import { useDrag } from "react-dnd";
import CustomLink from "shared/components/custom-link";
import { useDragEffect, useResponsive } from "shared/hooks";
import CardContent from "shared/components/card-content";
import { getUpdatedAllowedColumns } from "shared/helpers";

import { ICard } from "./card.types";
import { ROUTES } from "../../constants";

const Card: FC<ICard> = ({
  card,
  sourceColumnId,
  setDraggingState,
  isCardsHidden,
  onCardClick,
  isActive,
}) => {
  const { id, mentor } = card;
  const { isLargeDesktop } = useResponsive();
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: {
      id: card.id,
      sourceColumnId,
      allowedColumns: getUpdatedAllowedColumns(sourceColumnId, mentor?.id),
    },
    end: () => {
      setDraggingState({
        newItem: false,
        fromInReview: false,
        fromNotApproved: false,
      });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useDragEffect({
    card,
    sourceColumnId,
    setDraggingState,
    isDragging,
  });

  const cardContent = (
    <CardContent
      card={card}
      dragRef={dragRef}
      isDragging={isDragging}
      isCardsHidden={isCardsHidden}
      isActive={isActive}
      onCardClick={onCardClick}
      route={ROUTES.KANBAN}
    />
  );

  return !isLargeDesktop ? (
    <CustomLink path={`${ROUTES.KANBAN}/${id}`}>{cardContent}</CustomLink>
  ) : (
    cardContent
  );
};

export default Card;
