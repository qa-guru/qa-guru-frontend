import React from "react";
import { useUpdateHomeworkMutation } from "api/graphql/generated/graphql";
import { IUpdateHomeworkContainer } from "./update-homework-container.types";
import UpdateHomework from "../../views/homework-item/homework-content/update-homework";

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
