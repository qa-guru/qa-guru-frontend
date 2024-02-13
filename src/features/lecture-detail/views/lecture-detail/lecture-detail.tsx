import { FC } from "react";
import LectureHomework from "features/lecture-detail/views/lecture-homework";
import BlurredHomework from "shared/components/blurred/blurred-homework/blurred-homework";
import { Container } from "@mui/material";

import ButtonLessonsList from "../button-lessons-list";
import { ILectureDetail } from "./lecture-detail.types";
import LectureTitle from "../lecture-title";
import LectureDescription from "../lecture-description";
import LectureSpeakers from "../lecture-speakers";
import LectureContent from "../lecture-content";
import { Homework, HomeworksOtherStudents } from "../../containers";

const LectureDetail: FC<ILectureDetail> = (props) => {
  const { dataLecture, dataLectureHomework, tariffHomework } = props;
  const { subject, description, speakers, content } = dataLecture.lecture || {};
  const lectureHomeWork = dataLectureHomework?.lectureHomeWork || [];
  const hasHomework = lectureHomeWork?.length > 0;

  return (
    <Container>
      <ButtonLessonsList />
      <LectureTitle title={subject} />
      <LectureDescription description={description} />
      <LectureSpeakers speakers={speakers} />
      <LectureContent content={content} />
      {tariffHomework && hasHomework && (
        <>
          <LectureHomework lectureHomeWork={lectureHomeWork} />
          <Homework />
          <HomeworksOtherStudents />
        </>
      )}
      {!tariffHomework && <BlurredHomework />}
    </Container>
  );
};

export default LectureDetail;
