import React from "react";
import { useParams } from "react-router-dom";
import { useUserIdQuery } from "../../../api/graphql/user/userId";
import HomeworkWrapper from "./HomeworkWrapper";
import { useHomeWorkByStudentAndLectureQuery } from "../../../api/graphql/homework/homeWorkByStudentAndLecture";
import Spinner from "../../../shared/Spinner/Spinner";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const HomeworkWrapperContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { data: dataUserId } = useUserIdQuery();
  const { data, loading } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: dataUserId?.user?.id!, lectureId: lectureId! },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <HomeworkWrapper data={data} />;
};

export default HomeworkWrapperContainer;
