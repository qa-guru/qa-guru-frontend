import React from "react";
import { useLectureHomeWorkQuery } from "../../../../api/graphql/generated/graphql";
import Spinner from "../../../../shared/components/Spinner";
import NoDataErrorMessage from "../../../../shared/components/NoDataErrorMessage";
import LectureHomework from "../../../../shared/LectureHomework";

interface ILectureHomeworkContainer {
  lectureId: string;
}

const LectureHomeworkContainer: React.FC<ILectureHomeworkContainer> = ({
  lectureId,
}) => {
  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
    });

  if (loadingLectureHomeWork) return <Spinner />;

  if (!lectureId) return <NoDataErrorMessage />;

  return <LectureHomework dataLectureHomework={dataLectureHomework!} />;
};

export default LectureHomeworkContainer;
