import { FC } from "react";
import { InputAutocomplete } from "shared/components/form";
import { OptionTypeBase } from "shared/components/form/input-autocomplete/input-autocomplete.types";
import { Maybe } from "api/graphql/generated/graphql";

import { IMentorSelection } from "./mentor-selection.types";
import { useKanbanForm } from "../../context/kanban-form-context";

const MentorSelection: FC<IMentorSelection> = ({ data, control, loading }) => {
  const items = data?.mentors?.items;
  const { setMentorId } = useKanbanForm();

  const mentorsOptions =
    items?.map((item) => ({
      id: item?.id || "",
      label: `${item?.firstName} ${item?.lastName}`,
    })) || [];

  const handleSelectChange = (selected: Maybe<OptionTypeBase>) => {
    if (!selected) {
      setMentorId(null);
    } else {
      setMentorId(selected!.id);
    }
  };

  return (
    <InputAutocomplete
      control={control}
      name="mentors"
      placeholder="Выберите наставника"
      options={mentorsOptions}
      onSelect={handleSelectChange}
      loading={loading}
    />
  );
};

export default MentorSelection;
