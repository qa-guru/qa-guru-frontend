import React from "react";
import { Box, Button, Fade, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { format, parseISO } from "date-fns";
import { StyledBox, StyledPaper } from "./homework-details.styled";
import { IHomeworkDetail } from "./homework-details.types";
import { getFormattedId } from "../../helpers/get-formatted-id";
import UserRow from "../../../../shared/components/user-row";
import { ReactComponent as MentorIcon } from "../../../../assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "../../../../assets/icons/student.svg";
import StatusContent from "../../../../shared/components/status-content";
import TextSerialization from "../../../../shared/serializers/text-serialization";
import LectureHomework from "../../../../shared/components/lecture-homework";
import { ReactComponent as ExpandIcon } from "../../../../assets/icons/expand.svg";

const HomeworkDetails: React.FC<IHomeworkDetail> = ({
  card,
  onClose,
  showHomeworkDetails,
}) => {
  const Format = "dd.MM.yyyy | HH:mm";

  return (
    <Fade in={showHomeworkDetails} timeout={700}>
      <Box>
        <ExpandIcon />
        <StyledBox>
          <Stack spacing={1} direction="row" justifyContent={"space-between"}>
            <Typography variant="h6">{getFormattedId(card.id!)}</Typography>
            <Button onClick={onClose} variant="contained">
              Свернуть <ChevronRightIcon />
            </Button>
          </Stack>
          <Typography variant="body1" mt={2}>
            {card.lecture?.subject}
          </Typography>
          <Stack spacing={2} direction="row" mt={2}>
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
          </Stack>
          <Stack spacing={2} direction="row" mt={2}>
            <Stack direction="column">
              <Typography variant="body2">Создано</Typography>
              <Typography variant="caption" noWrap>
                {card.creationDate &&
                  format(parseISO(card.creationDate), Format)}
              </Typography>
            </Stack>
            {card.startCheckingDate && (
              <Stack direction="column">
                <Typography variant="body2">Начало проверки</Typography>
                <Typography variant="caption" noWrap>
                  {card.startCheckingDate &&
                    format(parseISO(card.startCheckingDate), Format)}
                </Typography>
              </Stack>
            )}
            {card.endCheckingDate && (
              <Stack direction="column">
                <Typography variant="body2">Окончание проверки</Typography>
                <Typography variant="caption">
                  {card.endCheckingDate &&
                    format(parseISO(card.endCheckingDate), Format)}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Box mt="15px">
            <StatusContent status={card.status!} />
          </Box>
          <LectureHomework lectureHomeWork={card.lecture?.contentHomeWork!} />
          <StyledPaper>
            <Typography variant="h5" mb={2}>
              Ответ на задание
            </Typography>
            <TextSerialization text={card.answer!} />
          </StyledPaper>
        </StyledBox>
      </Box>
    </Fade>
  );
};

export default HomeworkDetails;
