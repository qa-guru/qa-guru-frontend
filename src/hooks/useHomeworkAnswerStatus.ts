import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "../cache";
import { useHomeWorkByStudentAndLectureQuery } from "../api/graphql/homework/homeWorkByStudentAndLecture";
import { StudentHomeWorkStatus } from "../generated/graphql";

const useHomeworkAnswerStatus = () => {
  const { lectureId } = useParams();
  const idUser = useReactiveVar(userIdVar);
  const { data } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: idUser!, lectureId: lectureId! },
  });
  const [homeworkStatusAnswer, setHomeworkStatusAnswer] =
    useState<StudentHomeWorkStatus>();

  useEffect(() => {
    setHomeworkStatusAnswer(data?.homeWorkByStudentAndLecture?.status!);
  }, [data]);

  return [homeworkStatusAnswer];
};

export default useHomeworkAnswerStatus;
