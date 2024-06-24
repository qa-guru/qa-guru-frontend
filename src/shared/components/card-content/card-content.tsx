import { ComponentType, FC } from "react";
import { Typography } from "@mui/material";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import UserRow from "shared/components/user-row";
import CardHeader from "shared/components/card-header";
import { Maybe, UserDto } from "api/graphql/generated/graphql";

import {
  StyledBox,
  StyledPaper,
  StyledUserRowStack,
} from "./card-content.styled";
import { ICardContent } from "./card-content.types";

const CardContent: FC<ICardContent> = ({
  card,
  dragRef,
  isDragging,
  isCardsHidden,
  isActive,
  onCardClick,
  route,
}) => {
  const { id, mentor, student, lecture, training, creationDate } = card;

  const renderUserRow = (
    icon: ComponentType,
    size: { width: number; height: number },
    user?: Maybe<UserDto>
  ) =>
    user && (
      <UserRow
        icon={icon}
        user={user}
        width={size.width}
        height={size.height}
        variant="body2"
        userId={user.id}
        hasLink
      />
    );

  return (
    <StyledPaper
      isDragging={isDragging}
      isCardsHidden={isCardsHidden}
      isActive={isActive}
      ref={dragRef}
      onClick={onCardClick}
      elevation={4}
    >
      <CardHeader
        cardId={id}
        creationDate={creationDate}
        techStack={training?.techStack}
        isActive={isActive}
        route={route}
      />
      <StyledBox>
        <Typography variant="body2">{lecture?.subject}</Typography>
        <StyledUserRowStack>
          {renderUserRow(MentorIcon, { width: 24, height: 24 }, mentor)}
          {renderUserRow(StudentIcon, { width: 26, height: 26 }, student)}
        </StyledUserRowStack>
      </StyledBox>
    </StyledPaper>
  );
};

export default CardContent;
