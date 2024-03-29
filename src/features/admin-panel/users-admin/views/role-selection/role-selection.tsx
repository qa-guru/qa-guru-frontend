import { FC } from "react";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import { ROLES } from "shared/constants/constants";
import { InputSelect } from "shared/components/form";

import { useTableAdminFilter } from "../../context/admin-table-context";
import { IRoleSelection } from "./role-selection.types";

const RoleSelection: FC<IRoleSelection> = ({ control }) => {
  const { setFilter } = useTableAdminFilter();

  const roleOptions =
    ROLES?.map((state) => ({
      id: state?.value,
      label: state?.text,
    })) || [];

  const handleSelectChange = (selected: Maybe<UserRole>) => {
    if (!selected) {
      setFilter(null);
    } else {
      setFilter({ role: selected });
    }
  };

  return (
    <InputSelect
      control={control}
      name="role"
      options={roleOptions}
      placeholder="Роль"
      onSelect={handleSelectChange}
    />
  );
};

export default RoleSelection;
