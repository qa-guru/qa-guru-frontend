import { FC } from "react";
import { useUpdateHomeworkMutation } from "api/graphql/generated/graphql";

import { IUpdateHomeworkContainer } from "./update-homework-container.types";
import UpdateHomework from "../../views/update-homework";

const UpdateHomeworkContainer: FC<IUpdateHomeworkContainer> = ({
  setOpenHomeWorkEdit,
  answer,
  id,
}) => {
  const [updateHomework, { loading }] = useUpdateHomeworkMutation();

  return (
    <UpdateHomework
      {...{ setOpenHomeWorkEdit, updateHomework, loading, answer, id }}
    />
  );
};

export default UpdateHomeworkContainer;
