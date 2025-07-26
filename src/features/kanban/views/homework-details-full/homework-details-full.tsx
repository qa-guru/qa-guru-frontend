import { FC } from "react";
import { Container, Typography } from "@mui/material";
import { useReactiveVar } from "@apollo/client";

import { userIdVar } from "cache";
import LectureHomework from "shared/features/lecture-homework";
import Homework from "shared/features/homework/view";
import StatusText from "shared/components/status-text";
import HomeworkBaseInfo from "shared/components/homework-base-info";
import { formatId } from "shared/helpers";
import { useRoleAccess } from "shared/hooks";
import { UserRole } from "api/graphql/generated/graphql";

import StatusSelect from "../../views/status-select";
import { IHomeworkDescriptionFull } from "./homework-details-full.types";
import { StyledInfoBox, StyledTitle } from "./homework-details-full.styled";

const HomeworkDetailsFull: FC<IHomeworkDescriptionFull> = ({ data }) => {
  const homeWork = data?.homeWork;
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
  } = data?.homeWork!;

  const hasAdminRoleAcces = useRoleAccess({
    allowedRoles: [UserRole.Admin],
  });

  const currentUserId = useReactiveVar(userIdVar);
  const isCurrentMentor = currentUserId === mentor?.id;
  const hasNoMentor = mentor?.id === undefined;
  const showSelect = hasAdminRoleAcces || isCurrentMentor || hasNoMentor;

  return (
    <Container>
      <StyledTitle variant="h6">
        {formatId(training?.techStack, id)}
      </StyledTitle>
      <Typography variant="h2">{lecture?.subject}</Typography>
      <StyledInfoBox>
        <HomeworkBaseInfo
          student={student}
          mentor={mentor}
          creationDate={creationDate}
          startCheckingDate={startCheckingDate}
          endCheckingDate={endCheckingDate}
        />
      </StyledInfoBox>
      {showSelect ? (
        <StatusSelect currentStatus={status} homeworkId={id} />
      ) : (
        <StatusText status={status} />
      )}
      <LectureHomework lectureHomeWork={lecture?.contentHomeWork} />
      <StyledInfoBox>
        <Homework
          dataHomeWorkByLectureAndTraining={homeWork}
          hideMentorAndStudent
        />
      </StyledInfoBox>
    </Container>
  );
};

export default HomeworkDetailsFull;
