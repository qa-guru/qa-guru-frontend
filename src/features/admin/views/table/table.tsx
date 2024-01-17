import { FC } from "react";

import useTableAdminState from "../../hooks/use-table-admin-state";
import { TableAdminFilterContext } from "../../context/admin-table-context";
import { Admin } from "../../containers";
import InputFilter from "../input-filter";

const Table: FC = () => {
  const tableAdminFilterState = useTableAdminState();

  return (
    <TableAdminFilterContext.Provider value={tableAdminFilterState}>
      <InputFilter />
      <Admin />
    </TableAdminFilterContext.Provider>
  );
};

export default Table;
