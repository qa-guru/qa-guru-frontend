import { FC } from "react";
import { Container, Typography } from "@mui/material";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import { format, parseISO } from "date-fns";
import UserRow from "shared/components/user-row";
import LectureHomework from "common/lecture-homework";
import Homework from "common/homework/view";
import StatusText from "shared/components/status-text";

import StatusSelect from "../../views/status-select";
import { IHomeworkDescriptionFull } from "./homework-details-full.types";
import {
  StyledAnswerBox,
  StyledColumnStack,
  StyledRowStack,
  StyledStack,
  StyledTitle,
} from "./homework-details-full.styled";
import { getFormattedId } from "../../helpers/get-formatted-id";

const HomeworkDetailsFull: FC<IHomeworkDescriptionFull> = ({
  data,
  dataUserId,
}) => {
  const Format = "dd.MM.yyyy | HH:mm";
  const { homeWork } = data;
  const {
    lecture,
    student,
    training,
    mentor,
    creationDate,
    startCheckingDate,
    endCheckingDate,
    status,
    id,
  } = homeWork!;

  const isCurrentMentor = dataUserId.user?.id === mentor?.id;
  const hasNoMentor = mentor?.id === undefined;

  return (
    <Container>
      <StyledTitle variant="h6">
        {getFormattedId(training?.techStack, id)}
      </StyledTitle>
      <Typography variant="h2">{lecture?.subject}</Typography>
      <StyledStack>
        <StyledRowStack>
          <UserRow
            icon={StudentIcon}
            user={student}
            userId={student?.id}
            hasLink
          />
          {mentor && (
            <UserRow
              icon={MentorIcon}
              user={mentor}
              userId={mentor.id}
              hasLink
            />
          )}
        </StyledRowStack>
        <StyledRowStack>
          <StyledColumnStack>
            <Typography variant="body2">Создано</Typography>
            <Typography variant="caption">
              {creationDate && format(parseISO(creationDate), Format)}
            </Typography>
          </StyledColumnStack>
          {startCheckingDate && (
            <StyledColumnStack>
              <Typography variant="body2">Начало проверки</Typography>
              <Typography variant="caption">
                {startCheckingDate &&
                  format(parseISO(startCheckingDate), Format)}
              </Typography>
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
        {isCurrentMentor || hasNoMentor ? (
          <StatusSelect currentStatus={status} homeworkId={id} />
        ) : (
          <StatusText status={status} />
        )}
      </StyledStack>
      <LectureHomework lectureHomeWork={lecture?.contentHomeWork} />
      <StyledAnswerBox>
        <Homework
          dataHomeWorkByLectureAndTraining={homeWork}
          dataUserId={dataUserId}
          hideMentorAndStudent
        />
      </StyledAnswerBox>
    </Container>
  );
};

export default HomeworkDetailsFull;
