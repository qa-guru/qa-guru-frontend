import React from "react";
import { ICreationDateToSelection } from "./CreationDateToSelection.types";
import RHF from "../../../../../shared/components/InputRHF";

const CreationDateToSelection: React.FC<ICreationDateToSelection> = ({
  control,
}) => {
  return (
    <RHF.InputDatePicker
      control={control}
      name="creationDateTo"
      label="Созданные до"
    />
  );
};

export default CreationDateToSelection;
