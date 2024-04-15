import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { format, parseISO } from "date-fns";
import UserRow from "shared/components/user-row";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import StatusText from "shared/components/status-text";
import LectureHomework from "features/lecture-detail/views/lecture-homework";
import { TextView } from "shared/components/text-editor";

import { IHomeworkDescription } from "./homework-details.types";
import {
  StyledHomeworkDetails,
  StyledBox,
  StyledColumnStack,
  StyledPaper,
  StyledRowStack,
  StyledStack,
  StyledTitle,
  StyledTypography,
  StyledId,
  StyledLink,
  StyledIconButton,
  StyledStatusContentBox,
  StyledIcon,
} from "./homework-details.styled";
import { getFormattedId } from "../../helpers/get-formatted-id";

const HomeworkDetails: FC<IHomeworkDescription> = ({ card, onClose }) => {
  const Format = "dd.MM.yyyy | HH:mm";
  const {
    training,
    id,
    mentor,
    student,
    lecture,
    status,
    answer,
    endCheckingDate,
    startCheckingDate,
    creationDate,
  } = card;

  return (
    <StyledHomeworkDetails>
      <StyledBox>
        <StyledStack>
          <StyledLink to={`/kanban-student/${id}`}>
            <StyledId>
              <Typography variant="h4">
                {getFormattedId(training?.techStack, id)}
              </Typography>
              <StyledIcon />
            </StyledId>
          </StyledLink>
        </StyledStack>
        <StyledIconButton onClick={onClose}>
          <ChevronRightIcon />
        </StyledIconButton>
        <Typography variant="h5">{lecture?.subject}</Typography>
        <StyledRowStack>
          <UserRow
            icon={StudentIcon}
            user={student}
            width={26}
            height={26}
            userId={student?.id}
            hasLink
          />
          {mentor && (
            <UserRow
              icon={MentorIcon}
              user={mentor}
              width={26}
              height={26}
              userId={mentor?.id}
              hasLink
            />
          )}
        </StyledRowStack>
        <StyledRowStack>
          <StyledColumnStack>
            <Typography variant="body2">Создано</Typography>
            <StyledTypography variant="caption">
              {creationDate && format(parseISO(creationDate), Format)}
            </StyledTypography>
          </StyledColumnStack>
          {startCheckingDate && (
            <StyledColumnStack>
              <Typography variant="body2">Начало проверки</Typography>
              <StyledTypography variant="caption">
                {startCheckingDate &&
                  format(parseISO(startCheckingDate), Format)}
              </StyledTypography>
            </StyledColumnStack>
          )}
          {endCheckingDate && (
            <StyledColumnStack>
              <Typography variant="body2">Окончание проверки</Typography>
              <Typography variant="caption">
                {endCheckingDate && format(parseISO(endCheckingDate), Format)}
              </Typography>
            </StyledColumnStack>
          )}
        </StyledRowStack>
        <StyledStatusContentBox>
          <StatusText status={status} />
        </StyledStatusContentBox>
        <LectureHomework lectureHomeWork={lecture?.contentHomeWork} />
        <StyledPaper>
          <StyledTitle variant="h5">Ответ на задание</StyledTitle>
          <Stack>
            <TextView content={answer} />
          </Stack>
        </StyledPaper>
      </StyledBox>
    </StyledHomeworkDetails>
  );
};

export default HomeworkDetails;
