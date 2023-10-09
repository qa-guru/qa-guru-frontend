import React, { useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";
import { IDragEffectByRole } from "./drag-effect-by-role.types";
import { IDraggingState } from "../../views/board/board.types";

const statusColumn = {
  new: "1",
  inReview: "2",
  notApproved: "4",
};

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

  const resetDraggingState = useCallback(() => {
    setDraggingState({
      newItem: false,
      fromInReview: false,
      fromNotApproved: false,
    });
  }, [setDraggingState]);

  const handleManagerDragEffect = useCallback(() => {
    enqueueSnackbar("MANAGER не может менять статус домашнего задания");
  }, [enqueueSnackbar]);

  const handleNonMentorDragEffect = useCallback(() => {
    enqueueSnackbar("Вы не можете поменять статус данной домашней работы");
  }, [enqueueSnackbar]);

  const updateDraggingState = useCallback(
    (key: keyof IDraggingState) => {
      setDraggingState((prevState) => ({ ...prevState, [key]: true }));
    },
    [setDraggingState]
  );

  const handleDragEffect = useCallback(() => {
    if (!isDragging) {
      resetDraggingState();
      return;
    }

    if (hasManagerRole) {
      handleManagerDragEffect();
      return;
    }

    switch (sourceColumnId) {
      case statusColumn.new:
        updateDraggingState("newItem");
        break;
      case statusColumn.inReview:
        if (userId !== mentorId) {
          handleNonMentorDragEffect();
          return;
        }
        updateDraggingState("fromInReview");
        break;
      case statusColumn.notApproved:
        if (userId !== mentorId) {
          handleNonMentorDragEffect();
          return;
        }
        updateDraggingState("fromNotApproved");
        break;
      default:
        break;
    }
  }, [
    isDragging,
    sourceColumnId,
    resetDraggingState,
    handleManagerDragEffect,
    handleNonMentorDragEffect,
    updateDraggingState,
    userId,
    mentorId,
    hasManagerRole,
  ]);

  useEffect(() => {
    handleDragEffect();
  }, [handleDragEffect]);

  return null;
};

export default DragEffectByRole;
