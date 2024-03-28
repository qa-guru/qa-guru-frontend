import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import UserRow from "shared/components/user-row";
import { useUserIdQuery } from "api/graphql/generated/graphql";

import {
  StyledBox,
  StyledCardHeader,
  StyledPaper,
  StyledUserRowStack,
} from "./card.styled";
import { ICard } from "./card.types";
import { getFormattedId } from "../../helpers/get-formatted-id";

const Card: FC<ICard> = ({ card, onCardClick }) => {
  const { id, mentor, student, lecture } = card;

  const { data } = useUserIdQuery({ fetchPolicy: "cache-first" });
  const isCurrentHomeworkActive = student?.id === data?.user?.id;

  return (
    <StyledPaper
      isCurrentHomeworkActive={isCurrentHomeworkActive}
      onClick={onCardClick}
      elevation={4}
    >
      <StyledCardHeader isCurrentHomeworkActive={isCurrentHomeworkActive}>
        <Typography textTransform="uppercase" variant="subtitle2">
          {getFormattedId(id)}
        </Typography>
        <Typography variant="body2">
          {card.creationDate &&
            format(parseISO(card.creationDate), "dd.MM.yyyy")}
        </Typography>
      </StyledCardHeader>
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
              hasLink
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
              hasLink
            />
          )}
        </StyledUserRowStack>
      </StyledBox>
    </StyledPaper>
  );
};

export default Card;
