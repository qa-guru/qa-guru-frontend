import React from "react";
import { ILectureDetailView } from "./LectureDetailView.types";
import LectureTitle from "./components/LectureTitle";
import LectureDescription from "./components/LectureDescription";
import LectureSpeakers from "./components/LectureSpeakers";
import LectureContent from "./components/LectureContent";
import LectureHomework from "./components/LectureHomework";
import Homework from "../LectureDetailContainer/Homework";
import BlurredHomework from "../../../shared/Blurred/BlurredHomework";
import HomeworksOtherStudents from "../LectureDetailContainer/HomeworksOtherStudents";

const LectureDetailView: React.FC<ILectureDetailView> = (props) => {
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

export default LectureDetailView;
