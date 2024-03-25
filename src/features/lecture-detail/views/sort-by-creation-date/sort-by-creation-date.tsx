import { FC } from "react";
import { InputSelect } from "shared/components/form";
import { Maybe, Order } from "api/graphql/generated/graphql";

import { useHomeworksForm } from "../../context/homeworks-form-context";
import { ISortByCreationDate, options } from "./sort-by-creation-date.types";

const SortByCreationDate: FC<ISortByCreationDate> = ({ control }) => {
  const { setSortOrder } = useHomeworksForm();

  const sortOptions =
    options?.map((option) => ({
      id: option?.id,
      label: option?.label,
    })) || [];

  const handleSelectChange = (selected: Maybe<Order>) => {
    if (!selected) {
      setSortOrder(null);
    } else {
      setSortOrder(selected);
    }
  };

  return (
    <InputSelect
      control={control}
      name="order"
      options={sortOptions}
      placeholder="Сортировка"
      defaultValue="DESC"
      onSelect={handleSelectChange}
    />
  );
};

export default SortByCreationDate;
