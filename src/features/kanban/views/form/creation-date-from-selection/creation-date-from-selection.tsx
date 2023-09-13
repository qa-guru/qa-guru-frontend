import * as React from "react";
import { ICreationDateFromSelection } from "./creation-date-from-selection.types";
import RHF from "../../../../../shared/components/input-RHF";

const CreationDateFromSelection: React.FC<ICreationDateFromSelection> = ({
  control,
}) => {
  return (
    <RHF.InputDatePicker
      control={control}
      name="creationDateFrom"
      label="Созданные от"
    />
  );
};

export default CreationDateFromSelection;
