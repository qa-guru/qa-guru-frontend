import { FC, useMemo } from "react";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import { formatDate } from "shared/helpers";
import UserRow from "shared/components/user-row";
import Rating from "shared/components/rating";

import { StyledAlignStack } from "./table-columns.styled";
import { ITableColumns } from "./table-columns.types";
import Table from "../table";
import { LockUser, UnlockUser, UpdateRole } from "../../containers";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const theme = useTheme();
  const isOnlyXs = useMediaQuery(theme.breakpoints.only("xs"));

  const columns = useMemo<ColumnDef<UserDto>[]>(
    () => [
      {
        header: `Пользователи (${data?.users?.totalElements})`,
        footer: (props) => props.column.id,
        accessorKey: "firstName",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { firstName, lastName, roles } = info.row.original;

          return (
            <UserRow
              user={info.row.original}
              hideAvatar={isOnlyXs}
              hideRoles
              hideRating
              firstName={firstName}
              lastName={lastName}
              roles={roles}
              userId={info.row.original.id}
              hasLink
            />
          );
        },
      },
      {
        header: "Рейтинг",
        footer: (props) => props.column.id,
        accessorKey: "rating.rating",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { rating } = info.row.original;

          return <Rating rating={rating} />;
        },
        size: 80,
      },
      {
        header: "E-mail",
        footer: (props) => props.column.id,
        accessorKey: "email",
        size: 170,
      },

      {
        header: "Роль",
        footer: (props) => props.column.id,
        accessorKey: "roles",
        cell: (info: CellContext<UserDto, unknown>) =>
          isOnlyXs ? (
            <Typography>{info.row.original.roles}</Typography>
          ) : (
            <UpdateRole
              roles={info.row.original.roles}
              id={info.row.original.id}
            />
          ),
        size: 130,
      },
      {
        header: "Дата\u00A0регистрации",
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { creationDate } = info.row.original;

          return (
            <StyledAlignStack position="relative">
              <Typography variant="body2">
                {formatDate(creationDate, "DD.MM.YYYY")}
              </Typography>
            </StyledAlignStack>
          );
        },
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "lock",
        size: 50,

        cell: (info: CellContext<UserDto, unknown>) => {
          const { locked, id } = info.row.original;

          return <>{locked ? <UnlockUser id={id} /> : <LockUser id={id} />}</>;
        },
      },
    ],
    [isOnlyXs]
  );

  return <Table {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
