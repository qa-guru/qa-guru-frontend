import { MouseEvent } from "react";
import { type ConnectDragSource } from "react-dnd";

import { StudentHomeWorkDto } from "api/graphql/generated/graphql";

export interface ICardContent {
  card: StudentHomeWorkDto;
  dragRef?: ConnectDragSource;
  isDragging?: boolean;
  isCardsHidden?: boolean;
  onCardClick?: (event: MouseEvent<HTMLDivElement>) => void;
  isActive?: boolean;
  route: string;
}
