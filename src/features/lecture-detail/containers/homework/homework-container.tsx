import { FC, useContext } from "react";
import {
  useHomeWorkByLectureQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import Spinner from "shared/components/spinner";

import { LectureIdContext } from "../../context/lecture-id-context";
import Homework from "../../views/homework";

const HomeworkContainer: FC = () => {
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
      dataHomeWorkByLecture={dataHomeWorkByLecture?.homeWorkByLecture}
      dataUserId={dataUserId}
    />
  );
};

export default HomeworkContainer;
