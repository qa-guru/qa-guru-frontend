import React from "react";
import { ITrainingSelectionByRole } from "./training-selection-by-role.types";
import {
  UserRole,
  useUserRolesQuery,
} from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";
import Trainings from "../../containers/trainings";
import TrainingsByMentor from "../../containers/trainings-by-mentor";

const TrainingSelectionByRole: React.FC<ITrainingSelectionByRole> = ({
  control,
}) => {
  const { data } = useUserRolesQuery();
  const userRoles = data?.user?.roles;
  const rolePriority = [UserRole.Manager, UserRole.Mentor];

  const primaryRole = rolePriority.find((role) => userRoles?.includes(role));

  let component = null;

  if (primaryRole === UserRole.Manager) {
    component = <Trainings control={control} />;
  } else if (primaryRole === UserRole.Mentor) {
    component = <TrainingsByMentor control={control} />;
  }

  return component;
};

export default TrainingSelectionByRole;
