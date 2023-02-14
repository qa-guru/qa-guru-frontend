import React from "react";
import Homework from "./Homework";
import { useHomeWorkByStudentAndLectureQuery } from "../../../api/graphql/homework/homeWorkByStudentAndLecture";
import Spinner from "../../../shared/Spinner";
import { useParams } from "react-router-dom";
import { useUserIdQuery } from "../../../api/graphql/user/userId";

const HomeworkContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { data: dataUserId } = useUserIdQuery();
  const { data, loading } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: dataUserId?.user?.id!, lectureId: lectureId! },
  });

  if (loading && !data) return <Spinner />;

  return <Homework data={data!} />;
};

export default HomeworkContainer;
