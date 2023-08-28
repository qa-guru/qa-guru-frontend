import React from "react";
import { ILectureDetail } from "./LectureDetail.types";
import LectureTitle from "./LectureTitle";
import LectureDescription from "./LectureDescription";
import LectureSpeakers from "./LectureSpeakers";
import LectureContent from "./LectureContent";
import LectureHomework from "../../../shared/components/LectureHomework";
import BlurredHomework from "../../../shared/components/Blurred/BlurredHomework";
import HomeworksOtherStudents from "../containers/HomeworksOtherStudents";
import Homework from "../containers/Homework";

const LectureDetail: React.FC<ILectureDetail> = (props) => {
  const { dataLecture, dataLectureHomework, tariffHomework } = props;
  const { subject, description, speakers, content } = dataLecture.lecture!;
  const hasHomework = dataLectureHomework?.lectureHomeWork?.length! > 0;

  return (
    <>
      <LectureTitle title={subject!} />
      <LectureDescription description={description!} />
      <LectureSpeakers speakers={speakers!} />
      <LectureContent content={content!} />
      {tariffHomework && hasHomework && (
        <>
          <LectureHomework dataLectureHomework={dataLectureHomework} />
          <Homework />
          <HomeworksOtherStudents />
        </>
      )}
      {!tariffHomework && <BlurredHomework />}
    </>
  );
};

export default LectureDetail;
