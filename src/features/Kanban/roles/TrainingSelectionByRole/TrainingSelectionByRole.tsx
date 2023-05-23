import React from "react";
import { ITrainingSelectionByRole } from "./TrainingSelectionByRole.types";
import {
  UserRole,
  useUserRolesQuery,
} from "../../../../api/graphql/generated/graphql";
import Trainings from "../../containers/Trainings";
import TrainingsByMentor from "../../containers/TrainingsByMentor";

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
