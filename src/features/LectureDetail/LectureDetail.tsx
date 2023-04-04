import React from "react";
import { Paper } from "@mui/material";
import LectureTitle from "./LectureTitle";
import LectureDescription from "./LectureDescription";
import LectureSpeakers from "./LectureSpeakers";
import LectureContent from "./LectureContent";
import { ILectureDetail } from "./LectureDetail.types";
import LectureHomework from "./LectureHomework";
import Homework from "./Homework";
import HomeworksOtherStudents from "./HomeworksOtherStudents";
import BlurredHomework from "../../shared/Blurred/BlurredHomework";

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
      {tariffHomework ? (
        <>
          {hasHomework && (
            <>
              <LectureHomework dataLectureHomework={dataLectureHomework} />
              <Homework />
              <HomeworksOtherStudents />
            </>
          )}
        </>
      ) : (
        <BlurredHomework />
      )}
    </>
  );
};

export default LectureDetail;
