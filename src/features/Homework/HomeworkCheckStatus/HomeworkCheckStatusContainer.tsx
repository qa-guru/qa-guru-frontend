import React from "react";
import { useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "../../../cache";
import { useHomeWorkByStudentAndLectureQuery } from "../../../api/graphql/homework/homeWorkByStudentAndLecture";
import HomeworkCheckStatus from "./HomeworkCheckStatus";
import Spinner from "../../../shared/Spinner";

const HomeworkCheckStatusContainer: React.FC = () => {
  const { lectureId } = useParams();

  const idUser = useReactiveVar(userIdVar);
  const { data, loading } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: idUser!, lectureId: lectureId! },
  });

  if (loading && !data) return <Spinner />;

  return <HomeworkCheckStatus data={data!} />;
};

export default HomeworkCheckStatusContainer;
