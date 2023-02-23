import React from "react";
import UpdateHomework from "./UpdateHomework";
import { useUpdateHomeworkMutation } from "../../../api/graphql/homework/updateHomework";
import { useParams } from "react-router-dom";
import { useUserIdQuery } from "../../../api/graphql/user/userId";
import { useHomeWorkByStudentAndLectureQuery } from "../../../api/graphql/homework/homeWorkByStudentAndLecture";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";
import Spinner from "../../../shared/Spinner/Spinner";

interface IUpdateHomeworkContainer {
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateHomeworkContainer: React.FC<IUpdateHomeworkContainer> = ({
  setOpenHomeWorkEdit,
}) => {
  const { lectureId } = useParams();
  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();
  const { data: dataHomework, loading: loadingHomeWorkByStudentAndLecture } =
    useHomeWorkByStudentAndLectureQuery({
      variables: { studentId: dataUserId?.user?.id!, lectureId: lectureId! },
    });
  const [updateHomework, { loading }] = useUpdateHomeworkMutation();

  if (loadingUserId || loadingHomeWorkByStudentAndLecture) return <Spinner />;
  if (!dataHomework || !dataUserId?.user?.id) return <NoDataErrorMessage />;

  return (
    <UpdateHomework
      setOpenHomeWorkEdit={setOpenHomeWorkEdit}
      loading={loading}
      updateHomework={updateHomework}
      dataHomework={dataHomework}
    />
  );
};

export default UpdateHomeworkContainer;
