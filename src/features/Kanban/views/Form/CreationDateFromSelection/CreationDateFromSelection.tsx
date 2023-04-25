import * as React from "react";
import { ICreationDateFromSelection } from "./CreationDateFromSelection.types";
import RHF from "../../../../../shared/InputRHF";

const CreationDateFromSelection: React.FC<ICreationDateFromSelection> = ({
  control,
}) => {
  return (
    <RHF.InputDatePicker
      control={control}
      name="creationDateFrom"
      label="Выберите дату от"
    />
  );
};

export default CreationDateFromSelection;
