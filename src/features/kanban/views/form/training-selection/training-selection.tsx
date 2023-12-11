import { FC } from "react";
import { UserRole } from "api/graphql/generated/graphql";
import { Trainings, TrainingsByMentor } from "features/kanban/containers";
import useRoleAccess from "shared/hooks/use-role-access";

import { ITrainingSelection } from "./training-selection.types";

const TrainingSelection: FC<ITrainingSelection> = ({ control }) => {
  let trainings = null;

  const hasMentorAccess = useRoleAccess({ allowedRoles: [UserRole.Manager] });

  if (hasMentorAccess) {
    trainings = <TrainingsByMentor control={control} />;
  } else {
    trainings = <Trainings control={control} />;
  }

  return trainings;
};

export default TrainingSelection;
