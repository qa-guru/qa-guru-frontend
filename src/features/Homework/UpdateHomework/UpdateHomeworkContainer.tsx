import React from "react";
import UpdateHomework from "./UpdateHomework";
import { useUpdateHomeworkMutation } from "../../../api/graphql/homework/updateHomework";
import { useParams } from "react-router-dom";
import { useUserIdQuery } from "../../../api/graphql/user/userId";
import { useHomeWorkByStudentAndLectureQuery } from "../../../api/graphql/homework/homeWorkByStudentAndLecture";

interface IUpdateHomeworkContainer {
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<Boolean>>;
}

const UpdateHomeworkContainer: React.FC<IUpdateHomeworkContainer> = ({
  setOpenHomeWorkEdit,
}) => {
  const { lectureId } = useParams();
  const { data: dataUserId } = useUserIdQuery();
  const { data: dataHomework } = useHomeWorkByStudentAndLectureQuery({
    variables: { studentId: dataUserId?.user?.id!, lectureId: lectureId! },
  });
  const [updateHomework, { loading }] = useUpdateHomeworkMutation();

  return (
    <UpdateHomework
      setOpenHomeWorkEdit={setOpenHomeWorkEdit}
      loading={loading}
      updateHomework={updateHomework}
      dataHomework={dataHomework!}
    />
  );
};

export default UpdateHomeworkContainer;
