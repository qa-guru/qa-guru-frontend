import { FC } from "react";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import { format, parseISO } from "date-fns";
import UserRow from "shared/components/user-row";
import LectureHomework from "shared/components/lecture-homework";
import Homework from "features/lecture-detail/views/homework";
import StatusSelect from "features/kanban/views/status-select";
import StatusText from "shared/components/status-text";

import { IHomeworkDescriptionFull } from "./homework-details-full.types";
import {
  StyledAnswerBox,
  StyledColumnStack,
  StyledIcon,
  StyledNavigateButton,
  StyledRowStack,
  StyledStack,
  StyledTitle,
} from "./homework-details-full.styled";
import { getFormattedId } from "../../helpers/get-formatted-id";
import { ROUTES } from "../../constants";

const HomeworkDetailsFull: FC<IHomeworkDescriptionFull> = ({
  data,
  dataUserId,
}) => {
  const navigate = useNavigate();
  const Format = "dd.MM.yyyy | HH:mm";
  const { homeWork } = data;
  const {
    lecture,
    student,
    mentor,
    creationDate,
    startCheckingDate,
    endCheckingDate,
    status,
    id,
  } = homeWork!;

  const handleBack = () => {
    navigate(ROUTES.KANBAN);
  };

  const isCurrentMentor = dataUserId.user?.id === mentor?.id;

  return (
    <Container>
      <StyledNavigateButton variant="outlined" onClick={handleBack}>
        <StyledIcon />
        <Typography variant="body2">К доске заданий</Typography>
      </StyledNavigateButton>
      <StyledTitle variant="h6">{getFormattedId(lecture?.id)}</StyledTitle>
      <Typography variant="h2">{lecture?.subject}</Typography>
      <StyledStack>
        <StyledRowStack>
          <UserRow icon={StudentIcon} user={student} />
          {mentor && <UserRow icon={MentorIcon} user={mentor} />}
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
        {isCurrentMentor ? (
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
