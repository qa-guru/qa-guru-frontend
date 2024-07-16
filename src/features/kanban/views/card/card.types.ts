import { Dispatch, MouseEvent, SetStateAction } from "react";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";

import { IDraggingState } from "../board/board.types";

export interface ICard {
  card: StudentHomeWorkDto;
  sourceColumnId: string;
  setDraggingState: Dispatch<SetStateAction<IDraggingState>>;
  isCardsHidden: boolean;
  onCardClick?: (event: MouseEvent<HTMLDivElement>) => void;
  isActive?: boolean;
}
