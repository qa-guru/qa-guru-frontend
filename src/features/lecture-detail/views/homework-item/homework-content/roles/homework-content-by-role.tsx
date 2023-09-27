import React from "react";
import { useUserRolesQuery } from "api/graphql/generated/graphql";
import { IHomeworkContentByRole } from "./homework-content-by-role.types";

const HomeworkContentByRole: React.FC<IHomeworkContentByRole> = (props) => {
  const { status, answer, openHomeWorkEdit, setOpenHomeWorkEdit, id } = props;
  const { data } = useUserRolesQuery();
  const userRoles = data?.user?.roles;

  return <></>;
};

export default HomeworkContentByRole;
