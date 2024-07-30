import { FC } from "react";

import { InputSelect } from "shared/components/form";
import { Maybe, StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import { STATES } from "shared/constants";

import { IStatusSelection } from "./status-selection.types";
import { useHomeworksForm } from "../../context/homeworks-other-students-form-context";

const StatusSelection: FC<IStatusSelection> = ({ control }) => {
  const { setStatus } = useHomeworksForm();

  const statusOptions =
    STATES?.map((state) => ({
      id: state?.value,
      label: state?.text,
    })) || [];

  const handleSelectChange = (selected: Maybe<StudentHomeWorkStatus>) => {
    if (!selected) {
      setStatus(null);
    } else {
      setStatus(selected);
    }
  };

  return (
    <InputSelect
      control={control}
      name="status"
      options={statusOptions}
      placeholder="Статус"
      onSelect={handleSelectChange}
    />
  );
};

export default StatusSelection;
