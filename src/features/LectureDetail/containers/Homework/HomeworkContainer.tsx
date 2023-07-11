import React, { useContext } from "react";
import Homework from "../../views/Homework";
import {
  useHomeWorkByLectureQuery,
  useUserIdQuery,
} from "../../../../api/graphql/generated/graphql";
import { LectureIdContext } from "../../context/LectureIdContext";
import NoDataErrorMessage from "../../../../shared/NoDataErrorMessage";
import Spinner from "../../../../shared/Spinner";

const HomeworkContainer: React.FC = () => {
  const lectureId = useContext(LectureIdContext);
  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();

  const { data: dataHomeWorkByLecture, loading: loadingHomeWorkByLecture } =
    useHomeWorkByLectureQuery({
      variables: { lectureId: lectureId! },
      fetchPolicy: "cache-first",
    });

  if (loadingUserId || loadingHomeWorkByLecture) return <Spinner />;
  if (!dataHomeWorkByLecture || !dataUserId) return <NoDataErrorMessage />;

  return (
    <Homework
      dataHomeWorkByLecture={dataHomeWorkByLecture.homeWorkByLecture!}
      dataUserId={dataUserId!}
    />
  );
};

export default HomeworkContainer;
