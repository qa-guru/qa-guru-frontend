import React from "react";
import { IAssignedToMeSelection } from "./AssignedToMeSelection.types";
import RHF from "../../../../../shared/InputRHF";

const AssignedToMeSelection: React.FC<IAssignedToMeSelection> = ({
  data,
  control,
}) => {
  const id = data?.user?.id;

  const content = [{ value: id!, label: "Назначенные на меня" }];

  return (
    <div>
      <RHF.InputRadio
        control={control}
        name="selectAssignToMe"
        content={content}
      />
    </div>
  );
};

export default AssignedToMeSelection;
