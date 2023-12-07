import { FC } from "react";
import { UserRole, useUserRolesQuery } from "api/graphql/generated/graphql";
import { Trainings, TrainingsByMentor } from "features/kanban/containers";

import { ITrainingSelectionByRole } from "./training-selection-by-role.types";

const TrainingSelectionByRole: FC<ITrainingSelectionByRole> = ({ control }) => {
  const { data } = useUserRolesQuery();
  const userRoles = data?.user?.roles;
  const rolePriority = [UserRole.Manager, UserRole.Mentor];

  const primaryRole = rolePriority.find((role) => userRoles?.includes(role));

  let component = null;

  if (primaryRole === UserRole.Manager) {
    component = <Trainings control={control} />;
  } else if (primaryRole === UserRole.Mentor) {
    component = <TrainingsByMentor control={control} />;
  } else {
    component = <Trainings control={control} />;
  }

  return component;
};

export default TrainingSelectionByRole;
