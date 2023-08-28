import React from "react";
import { IUpdateHomeworkContainer } from "./UpdateHomeworkContainer.types";
import UpdateHomework from "../../views/HomeworkItem/HomeworkContent/UpdateHomework";
import { useUpdateHomeworkMutation } from "../../../../api/graphql/generated/graphql";

const UpdateHomeworkContainer: React.FC<IUpdateHomeworkContainer> = ({
  setOpenHomeWorkEdit,
  answer,
  id,
}) => {
  const [updateHomework, { loading }] = useUpdateHomeworkMutation();

  return (
    <UpdateHomework
      setOpenHomeWorkEdit={setOpenHomeWorkEdit}
      loading={loading}
      updateHomework={updateHomework}
      answer={answer}
      id={id}
    />
  );
};

export default UpdateHomeworkContainer;
