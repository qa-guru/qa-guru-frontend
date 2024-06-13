import { FC } from "react";
import { Typography } from "@mui/material";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import UserRow from "shared/components/user-row";
import CardHeader from "shared/components/card-header";
import { useResponsive } from "shared/hooks";

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
  const { isLargeDesktop } = useResponsive();

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
          {mentor && (
            <UserRow
              icon={MentorIcon}
              user={mentor}
              width={24}
              height={24}
              variant="body2"
              userId={mentor.id}
              hasLink={isLargeDesktop}
            />
          )}
          {student && (
            <UserRow
              icon={StudentIcon}
              user={student}
              width={26}
              height={26}
              variant="body2"
              userId={student.id}
              hasLink={isLargeDesktop}
            />
          )}
        </StyledUserRowStack>
      </StyledBox>
    </StyledPaper>
  );
};

export default CardContent;
