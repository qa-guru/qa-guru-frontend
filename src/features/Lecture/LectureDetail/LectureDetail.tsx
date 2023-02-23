import React from "react";
import LectureTitle from "./LectureTitle";
import LectureDescription from "./LectureDescription";
import LectureSpeakers from "./LectureSpeakers";
import LectureContent from "./LectureContent";
import { ILectureDetail } from "./LectureDetail.types";

const LectureDetail: React.FC<ILectureDetail> = (props) => {
  const { subject, description, speakers, content } = props.data.lecture!;

  return (
    <>
      <LectureTitle title={subject!} />
      <LectureDescription description={description!} />
      <LectureSpeakers speakers={speakers!} />
      <LectureContent content={content!} />
    </>
  );
};

export default LectureDetail;
