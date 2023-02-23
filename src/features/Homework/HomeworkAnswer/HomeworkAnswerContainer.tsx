import React from "react";
import HomeworkAnswer from "./HomeworkAnswer";
import Spinner from "../../../shared/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { useUserIdQuery } from "../../../api/graphql/user/userId";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";
import { useHomeWorkByStudentAndLectureQuery } from "../../../api/graphql/homework/homeWorkByStudentAndLecture";

const HomeworkAnswerContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { data: dataUserId } = useUserIdQuery();
  const { data, loading } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: dataUserId?.user?.id!, lectureId: lectureId! },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <HomeworkAnswer data={data} />;
};

export default HomeworkAnswerContainer;
