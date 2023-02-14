import React from "react";
import UpdateHomework from "./UpdateHomework";
import { useUpdateHomeworkMutation } from "../../../api/graphql/homework/updateHomework";

interface IUpdateHomeworkContainer {
  setUpdateHomeworkAnswer: React.Dispatch<React.SetStateAction<Boolean>>;
}

const UpdateHomeworkContainer: React.FC<IUpdateHomeworkContainer> = ({
  setUpdateHomeworkAnswer,
}) => {
  const [updateHomeWork, { loading }] = useUpdateHomeworkMutation();

  return (
    <UpdateHomework
      setUpdateHomeworkAnswer={setUpdateHomeworkAnswer}
      loading={loading}
      updateHomeWork={updateHomeWork}
    />
  );
};

export default UpdateHomeworkContainer;
