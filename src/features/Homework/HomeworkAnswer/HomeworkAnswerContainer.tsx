import React from "react";
import HomeworkAnswer from "./HomeworkAnswer";
import { useHomeWorkByStudentAndLectureQuery } from "../../../api/graphql/homework/homeWorkByStudentAndLecture";
import Spinner from "../../../shared/Spinner";
import { useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "../../../cache";

const HomeworkAnswerContainer: React.FC = () => {
  const { lectureId } = useParams();
  const idUser = useReactiveVar(userIdVar);
  const { data, loading } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: idUser!, lectureId: lectureId! },
  });

  if (loading && !data) return <Spinner />;

  return <HomeworkAnswer data={data!} />;
};

export default HomeworkAnswerContainer;
