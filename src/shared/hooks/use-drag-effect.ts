import { Dispatch, SetStateAction, useEffect } from "react";
import { useSnackbar } from "notistack";
import {
  StudentHomeWorkDto,
  UserRole,
  Maybe,
} from "api/graphql/generated/graphql";
import { useRoleAccess } from "shared/hooks/index";
import { IDraggingState } from "features/kanban-mentor/views/board/board.types";
import { STATUS_COLUMN } from "features/kanban-mentor/constants";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "cache";

interface IDragEffect {
  card: StudentHomeWorkDto;
  sourceColumnId: string;
  setDraggingState: Dispatch<SetStateAction<IDraggingState>>;
  isDragging: boolean;
  userRoles?: Maybe<Maybe<UserRole>[]>;
}

export const useDragEffect = ({
  card,
  sourceColumnId,
  setDraggingState,
  isDragging,
}: IDragEffect) => {
  const { enqueueSnackbar } = useSnackbar();

  const hasDraggAccess = useRoleAccess({
    allowedRoles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  });

  const currentUserId = useReactiveVar(userIdVar);
  const mentorId = card.mentor?.id;

  const isFromInReview = sourceColumnId === STATUS_COLUMN.IN_REVIEW;
  const isFromNotApproved = sourceColumnId === STATUS_COLUMN.NOT_APPROVED;

  useEffect(() => {
    if (!isDragging) {
      setDraggingState((prevState) => ({
        ...prevState,
        newItem: false,
        fromInReview: false,
        fromNotApproved: false,
      }));
      return;
    }

    if (!hasDraggAccess) {
      enqueueSnackbar("Вы не можете поменять статус этой домашней работы");
      return;
    }

    if (currentUserId !== mentorId && (isFromInReview || isFromNotApproved)) {
      enqueueSnackbar("Вы не можете поменять статус чужой домашней работы");
      return;
    }

    const stateUpdateMap = {
      [STATUS_COLUMN.NEW]: { newItem: true },
      [STATUS_COLUMN.IN_REVIEW]: { fromInReview: true },
      [STATUS_COLUMN.NOT_APPROVED]: { fromNotApproved: true },
    };

    setDraggingState((prevState) => ({
      ...prevState,
      ...stateUpdateMap[sourceColumnId],
    }));
  }, [
    isDragging,
    sourceColumnId,
    currentUserId,
    mentorId,
    enqueueSnackbar,
    setDraggingState,
  ]);
};
