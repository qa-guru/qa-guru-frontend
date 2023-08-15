import React from "react";
import { useLectureHomeWorkQuery } from "../../../../api/graphql/generated/graphql";
import Spinner from "../../../../shared/components/Spinner";
import NoDataErrorMessage from "../../../../shared/components/NoDataErrorMessage";
import LectureHomework from "../../../../shared/components/LectureHomework";

interface ILectureHomeworkContainer {
  lectureId: string;
}

const LectureHomeworkContainer: React.FC<ILectureHomeworkContainer> = ({
  lectureId,
}) => {
  const { data, loading } = useLectureHomeWorkQuery({
    variables: { lectureId: lectureId! },
  });

  if (loading) return <Spinner />;

  if (!data) return <NoDataErrorMessage />;

  return <LectureHomework dataLectureHomework={data!} />;
};

export default LectureHomeworkContainer;
