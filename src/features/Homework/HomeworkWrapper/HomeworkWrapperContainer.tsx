import React from "react";
import { useHomeWorkByStudentAndLectureStatusQuery } from "../../../api/graphql/homework/homeWorkByStudentAndLectureStatus";
import { useParams } from "react-router-dom";
import { useUserIdQuery } from "../../../api/graphql/user/userId";
import HomeworkWrapper from "./HomeworkWrapper";

const HomeworkWrapperContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { data: dataUserId } = useUserIdQuery();
  const { data: dataHomeworkStatus } =
    useHomeWorkByStudentAndLectureStatusQuery({
      variables: { studentId: dataUserId?.user?.id!, lectureId: lectureId! },
    });

  return <HomeworkWrapper dataHomeworkStatus={dataHomeworkStatus!} />;
};

export default HomeworkWrapperContainer;
