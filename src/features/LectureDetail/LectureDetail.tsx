import React from "react";
import LectureTitle from "./LectureTitle";
import LectureDescription from "./LectureDescription";
import LectureSpeakers from "./LectureSpeakers";
import LectureContent from "./LectureContent";
import { ILectureDetail } from "./LectureDetail.types";
import LectureHomework from "./LectureHomework";
import Homework from "./Homework";

const LectureDetail: React.FC<ILectureDetail> = (props) => {
  const { dataLecture, dataHomeWorkByLecture, dataLectureHomework } = props;
  const { subject, description, speakers, content } = dataLecture.lecture!;

  return (
    <>
      <LectureTitle title={subject!} />
      <LectureDescription description={description!} />
      <LectureSpeakers speakers={speakers!} />
      <LectureContent content={content!} />
      <LectureHomework dataLectureHomework={dataLectureHomework} />
      <Homework dataHomeWorkByLecture={dataHomeWorkByLecture} />
    </>
  );
};

export default LectureDetail;
