import React from "react";
import UpdateHomeworkItem from "./UpdateHomeworkItem";
import { IUpdateHomeworkContainer } from "./UpdateHomeworkItem.types";
import { useUpdateHomeworkMutation } from "../../../../api/graphql/homework/updateHomework";

const UpdateHomeworkItemContainer: React.FC<IUpdateHomeworkContainer> = ({
  setOpenHomeWorkEdit,
  answer,
  id,
}) => {
  const [updateHomework, { loading }] = useUpdateHomeworkMutation();

  return (
    <UpdateHomeworkItem
      setOpenHomeWorkEdit={setOpenHomeWorkEdit}
      loading={loading}
      updateHomework={updateHomework}
      answer={answer}
      id={id}
    />
  );
};

export default UpdateHomeworkItemContainer;
