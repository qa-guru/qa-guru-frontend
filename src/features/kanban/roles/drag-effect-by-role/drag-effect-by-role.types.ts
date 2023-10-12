import React from "react";
import { IDraggingState } from "../../views/board/board.types";
import {
  StudentHomeWorkDto,
  UserRole,
} from "../../../../api/graphql/generated/graphql";

export interface IDragEffectByRole {
  card: StudentHomeWorkDto;
  sourceColumnId: string;
  setDraggingState: React.Dispatch<React.SetStateAction<IDraggingState>>;
  isDragging: boolean;
  userId?: string | null;
  userRoles?: (UserRole | null)[] | null;
}
