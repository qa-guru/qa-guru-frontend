import { FC, useMemo } from "react";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { Typography } from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import { formatDate } from "shared/helpers";
import UserRow from "shared/components/user-row";

import { StyledAlignStack, StyledRightAlignBox } from "./admin.styled";
import { IAdmin } from "./admin.types";
import TableAdmin from "../table-admin";
import { LockUser, UnlockUser } from "../../containers";
import SelectRole from "../select-role";

const Admin: FC<IAdmin> = ({ data, fetchMore }) => {
  const columns = useMemo<ColumnDef<UserDto>[]>(
    () => [
      {
        header: "Пользователь",
        footer: (props) => props.column.id,
        accessorKey: "id",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { firstName, lastName, roles, rating } = info.row.original;

          return (
            <UserRow
              firstName={firstName}
              lastName={lastName}
              roles={roles}
              rating={rating}
            />
          );
        },
      },
      {
        header: "E-mail",
        footer: (props) => props.column.id,
        accessorKey: "email",
      },
      {
        header: "Роль",
        footer: (props) => props.column.id,
        accessorKey: "roles",
        cell: (info: CellContext<UserDto, unknown>) => (
          <SelectRole roles={info.row.original.roles} />
        ),
      },
      {
        header: "Дата регистрации",
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { creationDate, locked, id } = info.row.original;

          return (
            <StyledAlignStack>
              <Typography variant="body2">
                {formatDate(creationDate, "DD.MM.YYYY")}
              </Typography>
              <StyledRightAlignBox>
                {locked ? <UnlockUser id={id} /> : <LockUser id={id} />}
              </StyledRightAlignBox>
            </StyledAlignStack>
          );
        },
      },
    ],
    []
  );

  return <TableAdmin {...{ data, columns, fetchMore }} />;
};

export default Admin;
