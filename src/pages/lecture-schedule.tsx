import { FC } from "react";
import { Container } from "@mui/material";

import LectureScheduleContainer from "features/edit-training/containers/lecture-schedule";

const LectureSchedulePage: FC = () => {
  return (
    <Container maxWidth="xl">
      <LectureScheduleContainer />
    </Container>
  );
};

export default LectureSchedulePage;
