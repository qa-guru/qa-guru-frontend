import React from "react";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { IDraggingState } from "../board/board.types";

export interface ICard {
  card: StudentHomeWorkDto;
  sourceColumnId: string;
  setDraggingState: React.Dispatch<React.SetStateAction<IDraggingState>>;
  isCardsHidden: boolean;
  onCardClick?: () => void;
  isActive?: boolean;
}
