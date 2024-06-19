import { FC } from "react";
import CustomLink from "shared/components/custom-link";
import { useResponsive } from "shared/hooks";
import CardContent from "shared/components/card-content";

import { ICard } from "./card.types";
import { ROUTES } from "../../constants";

const Card: FC<ICard> = ({ card, onCardClick, isActive }) => {
  const { id } = card;
  const { isLargeDesktop } = useResponsive();

  const renderCardContent = () => (
    <CardContent
      card={card}
      isActive={isActive}
      onCardClick={onCardClick}
      route={ROUTES.KANBAN}
    />
  );
  const renderLink = () => (
    <CustomLink path={`${ROUTES.KANBAN}/${id}`}>
      {renderCardContent()}
    </CustomLink>
  );

  return !isLargeDesktop ? renderLink() : renderCardContent();
};

export default Card;
