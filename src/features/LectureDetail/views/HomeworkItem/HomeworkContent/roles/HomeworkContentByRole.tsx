import React from "react";
import { IHomeworkContentByRole } from "./HomeworkContentByRole.types";
import { useUserRolesQuery } from "../../../../../../api/graphql/generated/graphql";

const HomeworkContentByRole: React.FC<IHomeworkContentByRole> = (props) => {
  const { status, answer, openHomeWorkEdit, setOpenHomeWorkEdit, id } = props;
  const { data } = useUserRolesQuery();
  const userRoles = data?.user?.roles;

  return <></>;
};

export default HomeworkContentByRole;
