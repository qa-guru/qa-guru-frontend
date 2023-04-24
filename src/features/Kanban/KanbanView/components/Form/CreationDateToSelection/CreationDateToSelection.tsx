import React from "react";
import { ICreationDateToSelection } from "./CreationDateToSelection.types";
import RHF from "../../../../../../shared/InputRHF";

const CreationDateToSelection: React.FC<ICreationDateToSelection> = ({
  control,
}) => {
  return (
    <RHF.InputDatePicker
      control={control}
      name="creationDateTo"
      label="Выберите дату до"
    />
  );
};

export default CreationDateToSelection;
