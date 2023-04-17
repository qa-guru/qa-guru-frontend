import React, { useCallback, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Paper, Stack, Typography } from "@mui/material";
import { ICard } from "./Card.types";
import AvatarCustom from "../../../../../shared/AvatarCustom";
import { ReactComponent as MentorIcon } from "../../../../../assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "../../../../../assets/icons/student.svg";
import { UserDto } from "../../../../../api/graphql/generated/graphql";

interface UserRowProps {
  icon: React.ComponentType;
  user: UserDto;
}

const UserRow: React.FC<UserRowProps> = ({ icon: Icon, user }) => {
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Icon />
      <AvatarCustom
        fullName={fullName}
        width={26}
        height={26}
        variant="subtitle2"
      />
      <Stack direction="row">
        <Typography variant="subtitle1">{fullName}</Typography>
      </Stack>
    </Stack>
  );
};

const Card: React.FC<ICard> = ({
  card,
  sourceColumnId,
  allowedColumns,
  setIsDraggingNewItem,
  setIsDraggingFromInReview,
  isCardsHidden,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { id: card.id, sourceColumnId, allowedColumns },
    end: () => {
      setIsDraggingNewItem(false);
      setIsDraggingFromInReview(false);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDragEffect = useCallback(() => {
    if (isDragging) {
      if (sourceColumnId === "1") {
        setIsDraggingNewItem(true);
      } else if (sourceColumnId === "2") {
        setIsDraggingFromInReview(true);
      }
    }
  }, [
    isDragging,
    sourceColumnId,
    setIsDraggingNewItem,
    setIsDraggingFromInReview,
  ]);

  useEffect(() => {
    handleDragEffect();
  }, [handleDragEffect]);

  return (
    <Paper
      ref={dragRef}
      sx={{
        backgroundColor: "white",
        padding: 1,
        borderRadius: 1,
        marginBottom: 1,
        boxShadow: 1,
        opacity: isDragging ? 0.5 : 1,
        visibility: isCardsHidden && !isDragging ? "hidden" : "visible",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <Typography variant="body1">{card.lecture?.subject}</Typography>
      <Stack spacing={1} mt="10px">
        <UserRow icon={MentorIcon} user={card.mentor!} />
        <UserRow icon={StudentIcon} user={card.student!} />
      </Stack>
    </Paper>
  );
};

export default Card;
