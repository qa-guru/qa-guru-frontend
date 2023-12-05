import { Dispatch, SetStateAction } from "react";
import { StudentHomeWorkDto, UserRole } from "api/graphql/generated/graphql";
import { IDraggingState } from "../../../features/kanban/views/board/board.types";

export interface IDragEffectByRole {
  card: StudentHomeWorkDto;
  sourceColumnId: string;
  setDraggingState: Dispatch<SetStateAction<IDraggingState>>;
  isDragging: boolean;
  userId?: string | null;
  userRoles?: (UserRole | null)[] | null;
}
