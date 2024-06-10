import { FC } from "react";
import { Container, Typography } from "@mui/material";
import LectureHomework from "common/lecture-homework";
import Homework from "common/homework/view";
import HomeworkBaseInfo from "shared/components/homework-base-info";
import { formatId } from "shared/helpers/format-id";

import StatusSelect from "../../views/status-select";
import { IHomeworkDescriptionFull } from "./homework-details-full.types";
import { StyledInfoBox, StyledTitle } from "./homework-details-full.styled";

const HomeworkDetailsFull: FC<IHomeworkDescriptionFull> = ({
  data,
  dataUserId,
}) => {
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
      <StatusSelect currentStatus={status} homeworkId={id} />
      <LectureHomework lectureHomeWork={lecture?.contentHomeWork} />
      <StyledInfoBox>
        <Homework
          dataHomeWorkByLectureAndTraining={homeWork}
          dataUserId={dataUserId}
          hideMentorAndStudent
        />
      </StyledInfoBox>
    </Container>
  );
};

export default HomeworkDetailsFull;
