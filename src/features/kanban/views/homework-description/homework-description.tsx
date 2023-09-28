import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { format, parseISO } from "date-fns";
import UserRow from "shared/components/user-row";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import StatusContent from "shared/components/status-content";
import TextSerialization from "shared/serializers/text-serialization";
import LectureHomework from "shared/components/lecture-homework";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  StyledBox,
  StyledColumnStack,
  StyledId,
  StyledLink,
  StyledPaper,
  StyledRowStack,
  StyledStack,
  StyledTitle,
  StyledTypography,
} from "./homework-description.styled";
import { IHomeworkDescription } from "./homework-description.types";
import { getFormattedId } from "../../helpers/get-formatted-id";

const HomeworkDescription: React.FC<IHomeworkDescription> = ({
  card,
  onClose,
}) => {
  const Format = "dd.MM.yyyy | HH:mm";

  return (
    <StyledBox>
      <StyledStack>
        <StyledId>
          <StyledLink to={`/kanban/${card.id}`}>
            <Typography variant="h6">{getFormattedId(card.id!)}</Typography>
          </StyledLink>
          <OpenInNewIcon />
        </StyledId>
        <Button onClick={onClose} variant="contained">
          Свернуть <ChevronRightIcon />
        </Button>
      </StyledStack>
      <Typography variant="body1">{card.lecture?.subject}</Typography>
      <StyledRowStack>
        <UserRow
          icon={StudentIcon}
          user={card.student!}
          width={26}
          height={26}
        />
        {card.mentor && (
          <UserRow
            icon={MentorIcon}
            user={card.mentor}
            width={26}
            height={26}
          />
        )}
      </StyledRowStack>
      <StyledRowStack>
        <StyledColumnStack>
          <Typography variant="body2">Создано</Typography>
          <StyledTypography variant="caption">
            {card.creationDate && format(parseISO(card.creationDate), Format)}
          </StyledTypography>
        </StyledColumnStack>
        {card.startCheckingDate && (
          <StyledColumnStack>
            <Typography variant="body2">Начало проверки</Typography>
            <StyledTypography variant="caption">
              {card.startCheckingDate &&
                format(parseISO(card.startCheckingDate), Format)}
            </StyledTypography>
          </StyledColumnStack>
        )}
        {card.endCheckingDate && (
          <StyledColumnStack>
            <Typography variant="body2">Окончание проверки</Typography>
            <Typography variant="caption">
              {card.endCheckingDate &&
                format(parseISO(card.endCheckingDate), Format)}
            </Typography>
          </StyledColumnStack>
        )}
      </StyledRowStack>
      <Box mt="15px">
        <StatusContent status={card.status!} />
      </Box>
      <LectureHomework lectureHomeWork={card.lecture?.contentHomeWork!} />
      <StyledPaper>
        <StyledTitle variant="h5">Ответ на задание</StyledTitle>
        <TextSerialization text={card.answer!} />
      </StyledPaper>
    </StyledBox>
  );
};

export default HomeworkDescription;
