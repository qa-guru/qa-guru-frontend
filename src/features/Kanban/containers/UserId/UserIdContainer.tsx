import React from "react";
import { IUserIdContainer } from "./UserIdContainer.types";
import { useUserIdQuery } from "../../../../api/graphql/user/userId";
import AssignedToMeSelection from "../../views/Form/AssignedToMeSelection";

const UserIdContainer: React.FC<IUserIdContainer> = ({ control }) => {
  const { data } = useUserIdQuery();

  return <AssignedToMeSelection control={control} data={data!} />;
};

export default UserIdContainer;
