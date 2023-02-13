import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "../cache";
import { useHomeWorkByStudentAndLectureQuery } from "../api/graphql/homework/homeWorkByStudentAndLecture";
import { StudentHomeWorkStatus } from "../generated/graphql";

const useHomeworkCheckStatus = () => {
  const { lectureId } = useParams();
  const idUser = useReactiveVar(userIdVar);
  const [homeworkStatus, setHomeworkStatus] = useState<StudentHomeWorkStatus>();
  const { data } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: idUser!, lectureId: lectureId! },
  });

  useEffect(() => {
    setHomeworkStatus(data?.homeWorkByStudentAndLecture?.status!);
  }, [data]);

  return [homeworkStatus];
};

export default useHomeworkCheckStatus;
