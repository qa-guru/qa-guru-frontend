import { FC } from "react";
import { Container } from "@mui/material";

import useTableAdminState from "../../hooks/use-table-admin-state";
import { TableAdminFilterContext } from "../../context/admin-table-context";
import InputFilter from "../input-filter";
import { Table } from "../../containers";

const Admin: FC = () => {
  const tableAdminFilterState = useTableAdminState();

  return (
    <TableAdminFilterContext.Provider value={tableAdminFilterState}>
      <Container>
        <InputFilter />
        <Table />
      </Container>
    </TableAdminFilterContext.Provider>
  );
};

export default Admin;
