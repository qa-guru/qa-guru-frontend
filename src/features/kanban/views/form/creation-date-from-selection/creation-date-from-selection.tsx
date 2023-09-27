import * as React from "react";
import RHF from "shared/components/input-RHF";
import { ICreationDateFromSelection } from "./creation-date-from-selection.types";

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
