import React from "react";
import { Box } from "@mui/material";
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
  const {
    dataLecture,
    dataHomeWorkByLecture,
    dataLectureHomework,
    tariffHomework,
    hasHomework,
  } = props;
  const { subject, description, speakers, content } = dataLecture.lecture!;

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
              <Box pt="40px">
                <Homework
                  editAccess={true}
                  dataHomeWorkByLecture={
                    dataHomeWorkByLecture.homeWorkByLecture!
                  }
                />
              </Box>
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
