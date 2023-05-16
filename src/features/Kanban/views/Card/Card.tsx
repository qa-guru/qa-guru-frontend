import React, { useCallback, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useSnackbar } from "notistack";
import { ICard } from "./Card.types";
import { ReactComponent as MentorIcon } from "../../../../assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "../../../../assets/icons/student.svg";
import { grey, white } from "../../../../theme/colors";
import UserRow from "../UserRow";
import { getUpdatedAllowedColumns } from "../../helpers/getUpdatedAllowedColumns";

const styles = {
  paper: {
    backgroundColor: white,
    borderRadius: 1,
    marginBottom: 1.5,
    boxShadow: 1,
    cursor: "grab",
  },
  draggedPaper: {
    opacity: 0.5,
    cursor: "grabbing",
  },
  hiddenPaper: {
    visibility: "hidden",
  },
  cardHeader: {
    backgroundColor: grey.light,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    padding: 1,
  },
};

const Card: React.FC<ICard> = ({
  card,
  sourceColumnId,
  setDraggingState,
  isCardsHidden,
  userId,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: {
      id: card.id,
      sourceColumnId,
      allowedColumns: getUpdatedAllowedColumns(
        sourceColumnId,
        userId,
        card.mentor?.id!
      ),
    },
    end: () => {
      setDraggingState({
        newItem: false,
        fromInReview: false,
        fromNotApproved: false,
      });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleDragEffect = useCallback(() => {
    if (!isDragging) {
      setDraggingState({
        newItem: false,
        fromInReview: false,
        fromNotApproved: false,
      });
      return;
    }

    if (sourceColumnId === "1") {
      setDraggingState((prevState) => ({ ...prevState, newItem: true }));
      return;
    }

    if (userId !== card.mentor?.id) {
      enqueueSnackbar("Вы не можете поменять статус данной домашней работы");
      return;
    }

    if (sourceColumnId === "2") {
      setDraggingState((prevState) => ({ ...prevState, fromInReview: true }));
    } else if (sourceColumnId === "4") {
      setDraggingState((prevState) => ({
        ...prevState,
        fromNotApproved: true,
      }));
    }
  }, [
    isDragging,
    sourceColumnId,
    setDraggingState,
    userId,
    card.mentor?.id,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    handleDragEffect();
  }, [handleDragEffect]);

  const paperStyles = [
    styles.paper,
    isDragging && styles.draggedPaper,
    isCardsHidden && !isDragging && styles.hiddenPaper,
  ];

  return (
    <Paper ref={dragRef} sx={paperStyles}>
      <Box sx={styles.cardHeader}>
        <Typography textTransform="uppercase" variant="subtitle2">
          {card.id}
        </Typography>
        <Typography variant="body2">
          {card.creationDate &&
            format(parseISO(card.creationDate), "dd.MM.yyyy")}
        </Typography>
      </Box>
      <Box padding={1}>
        <Typography variant="subtitle1">{card.lecture?.subject}</Typography>
        <Stack spacing={1} mt="10px">
          {card.mentor && <UserRow icon={MentorIcon} user={card.mentor} />}
          <UserRow icon={StudentIcon} user={card.student!} />
        </Stack>
      </Box>
    </Paper>
  );
};

export default Card;
