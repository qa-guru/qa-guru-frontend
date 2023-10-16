import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { IDragEffectByRole } from "./drag-effect-by-role.types";
import { STATUS_COLUMN } from "../../constants";

const DragEffectByRole: React.FC<IDragEffectByRole> = ({
  card,
  sourceColumnId,
  setDraggingState,
  isDragging,
  userId,
  userRoles,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const hasManagerRole = userRoles?.some((role) => role === "MANAGER");
  const mentorId = card.mentor?.id;

  useEffect(() => {
    if (!isDragging) {
      setDraggingState({
        newItem: false,
        fromInReview: false,
        fromNotApproved: false,
      });
      return;
    }

    if (hasManagerRole) {
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
    hasManagerRole,
    enqueueSnackbar,
    setDraggingState,
  ]);

  return null;
};

export default DragEffectByRole;
