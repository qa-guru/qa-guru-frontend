import React from "react";
import { useParams } from "react-router-dom";
import LectureTitle from "./LectureTitle";
import LectureDescription from "./LectureDescription";
import LectureSpeakers from "./LectureSpeakers";
import LectureContent from "./LectureContent";
import { ILectureDetail } from "./LectureDetail.types";
import LectureHomework from "./LectureHomework";
import Homework from "./Homework";
import useTariff from "../../hooks/useTariff";
import BlurredHomework from "../../shared/BlurredHomework";

const LectureDetail: React.FC<ILectureDetail> = (props) => {
  const { dataLecture, dataHomeWorkByLecture, dataLectureHomework } = props;
  const { subject, description, speakers, content } = dataLecture.lecture!;
  const { trainingId } = useParams();
  const { hasHomework } = useTariff({ trainingId });

  return (
    <>
      <LectureTitle title={subject!} />
      <LectureDescription description={description!} />
      <LectureSpeakers speakers={speakers!} />
      <LectureContent content={content!} />
      {hasHomework ? (
        <>
          {dataLectureHomework.lectureHomeWork?.length! > 0 && (
            <>
              <LectureHomework dataLectureHomework={dataLectureHomework} />
              <Homework dataHomeWorkByLecture={dataHomeWorkByLecture} />
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
