import { FC } from "react";
import { Container } from "@mui/material";

import { TableAdminFilterProvider } from "../../context/admin-table-context";
import InputFilter from "../input-filter";
import { Table } from "../../containers";
import { StyledTitle } from "../table-admin/table-admin.styled";

const Admin: FC = () => {
  return (
    <TableAdminFilterProvider>
      <Container>
        <StyledTitle variant="h2">Панель администратора</StyledTitle>
        <InputFilter />
        <Table />
      </Container>
    </TableAdminFilterProvider>
  );
};

export default Admin;
