import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { format, parseISO } from "date-fns";
import { IHomeworkDetail } from "./homework-details.types";
import {
  StyledBox,
  StyledColumnStack,
  StyledPaper,
  StyledRowStack,
  StyledStack,
  StyledTitle,
  StyledTypography,
} from "./homework-details.styled";
import { getFormattedId } from "../../helpers/get-formatted-id";
import UserRow from "../../../../shared/components/user-row";
import { ReactComponent as MentorIcon } from "../../../../assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "../../../../assets/icons/student.svg";
import StatusContent from "../../../../shared/components/status-content";
import TextSerialization from "../../../../shared/serializers/text-serialization";
import LectureHomework from "../../../../shared/components/lecture-homework";

const HomeworkDetails: React.FC<IHomeworkDetail> = ({ card, onClose }) => {
  const Format = "dd.MM.yyyy | HH:mm";

  return (
    <StyledBox>
      <StyledStack>
        <Typography variant="h6">{getFormattedId(card.id!)}</Typography>
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

export default HomeworkDetails;
