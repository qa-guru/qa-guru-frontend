import React from "react";
import { ICreationDateToSelection } from "./creation-date-to-selection.types";
import RHF from "../../../../../shared/components/input-RHF";

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
