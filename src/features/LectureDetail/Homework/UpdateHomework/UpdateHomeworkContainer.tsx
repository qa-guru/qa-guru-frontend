import React from "react";
import UpdateHomework from "./UpdateHomework";
import { IUpdateHomeworkContainer } from "./UpdateHomework.types";
import { useUpdateHomeworkMutation } from "../../../../api/graphql/homework/updateHomework";

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
