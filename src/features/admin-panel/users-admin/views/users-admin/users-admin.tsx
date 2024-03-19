import { FC } from "react";

import { TableAdminFilterProvider } from "../../context/admin-table-context";
import InputFilter from "../input-filter";
import { Table } from "../../containers";

const UsersAdminPage: FC = () => {
  return (
    <TableAdminFilterProvider>
      <InputFilter />
      <Table />
    </TableAdminFilterProvider>
  );
};

export default UsersAdminPage;
