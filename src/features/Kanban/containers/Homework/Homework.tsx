import React from "react";
import {
  useHomeWorkByLectureQuery,
  UserQuery,
} from "../../../../api/graphql/generated/graphql";
import Spinner from "../../../../shared/components/Spinner";
import NoDataErrorMessage from "../../../../shared/components/NoDataErrorMessage";
import Homework from "../../../../shared/Homework";

interface IHomeworkContainer {
  lectureId: string;
  dataUserId: UserQuery;
}

const HomeworkContainer: React.FC<IHomeworkContainer> = ({
  lectureId,
  dataUserId,
}) => {
  const { data: dataHomeWorkByLecture, loading: loadingHomeWorkByLecture } =
    useHomeWorkByLectureQuery({
      variables: { lectureId: lectureId! },
      fetchPolicy: "cache-first",
    });

  if (loadingHomeWorkByLecture) return <Spinner />;
  if (!dataHomeWorkByLecture) return <NoDataErrorMessage />;

  return (
    <Homework
      dataHomeWorkByLecture={dataHomeWorkByLecture}
      dataUserId={dataUserId}
    />
  );
};

export default HomeworkContainer;
