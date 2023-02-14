import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "../cache";
import { useHomeWorkByStudentAndLectureQuery } from "../api/graphql/homework/homeWorkByStudentAndLecture";

const useHomeworkAnswerId = () => {
  const { lectureId } = useParams();
  const idUser = useReactiveVar(userIdVar);
  const { data } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: idUser!, lectureId: lectureId! },
  });
  const [homeworkIdAnswer, setHomeworkIdAnswer] = useState<string>();

  useEffect(() => {
    setHomeworkIdAnswer(data?.homeWorkByStudentAndLecture?.id!);
  }, [data]);

  return [homeworkIdAnswer];
};

export default useHomeworkAnswerId;
