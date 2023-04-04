import React, { useContext } from "react";
import Homework from "./Homework";
import { useHomeWorkByLectureQuery } from "../../../api/graphql/generated/graphql";
import { LectureIdContext } from "../../../context/LectureIdContext";
import { useUserIdQuery } from "../../../api/graphql/user/userId";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";
import Spinner from "../../../shared/Spinner";

const HomeworkContainer: React.FC = () => {
  const lectureId = useContext(LectureIdContext);
  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();

  const { data: dataHomeWorkByLecture, loading: loadingHomeWorkByLecture } =
    useHomeWorkByLectureQuery({
      variables: { lectureId: lectureId! },
    });

  if (loadingUserId || loadingHomeWorkByLecture) return <Spinner />;
  if (!dataHomeWorkByLecture || !dataUserId) return <NoDataErrorMessage />;

  return (
    <Homework
      dataHomeWorkByLecture={dataHomeWorkByLecture?.homeWorkByLecture!}
      dataUserId={dataUserId!}
    />
  );
};

export default HomeworkContainer;
