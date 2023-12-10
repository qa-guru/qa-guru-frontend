import { Dispatch, SetStateAction, useEffect } from "react";
import { useSnackbar } from "notistack";
import { STATUS_COLUMN } from "features/kanban/constants";
import { StudentHomeWorkDto, UserRole } from "api/graphql/generated/graphql";
import useRoleAccess from "shared/hooks/use-role-access";

import { IDraggingState } from "../views/board/board.types";

interface IDragEffect {
  card: StudentHomeWorkDto;
  sourceColumnId: string;
  setDraggingState: Dispatch<SetStateAction<IDraggingState>>;
  isDragging: boolean;
  userId?: string | null;
  userRoles?: (UserRole | null)[] | null;
}

const useDragEffect = ({
  card,
  sourceColumnId,
  setDraggingState,
  isDragging,
  userId,
}: IDragEffect) => {
  const { enqueueSnackbar } = useSnackbar();
  const hasManagerAccess = useRoleAccess({ allowedRoles: [UserRole.Manager] });
  const hasMentorAccess = useRoleAccess({ allowedRoles: [UserRole.Mentor] });

  const mentorId = card.mentor?.id;

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

    if (hasManagerAccess && !hasMentorAccess) {
      enqueueSnackbar("MANAGER не может менять статус домашнего задания");
      return;
    }

    if (
      userId !== mentorId &&
      (sourceColumnId === STATUS_COLUMN.IN_REVIEW ||
        sourceColumnId === STATUS_COLUMN.NOT_APPROVED)
    ) {
      enqueueSnackbar("Вы не можете поменять статус данной домашней работы");
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
    userId,
    mentorId,
    enqueueSnackbar,
    setDraggingState,
  ]);
};

export default useDragEffect;
