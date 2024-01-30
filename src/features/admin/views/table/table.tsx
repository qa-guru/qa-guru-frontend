import { FC } from "react";
import { Container } from "@mui/material";

import useTableAdminState from "../../hooks/use-table-admin-state";
import { TableAdminFilterContext } from "../../context/admin-table-context";
import InputFilter from "../input-filter";
import { Admin } from "../../containers";

const Table: FC = () => {
  const tableAdminFilterState = useTableAdminState();

  return (
    <TableAdminFilterContext.Provider value={tableAdminFilterState}>
      <Container>
        <InputFilter />
        <Admin />
      </Container>
    </TableAdminFilterContext.Provider>
  );
};

export default Table;
