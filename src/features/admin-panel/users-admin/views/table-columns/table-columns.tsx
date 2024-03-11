import { FC, useMemo } from "react";
import {
  type CellContext,
  type ColumnDef,
  type HeaderContext,
} from "@tanstack/react-table";
import { Typography } from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import { formatDate } from "shared/helpers";
import UserRow from "shared/components/user-row";
import Rating from "shared/components/rating";
import useResponsive from "shared/hooks/use-responsive";

import { StyledAlignStack, StyledRightAlignBox } from "./table-columns.styled";
import { ITableColumns } from "./table-columns.types";
import Table from "../table";
import { LockUser, UnlockUser, UpdateRole } from "../../containers";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const { isMobile, isMobileOrTablet } = useResponsive();

  const columns = useMemo<ColumnDef<UserDto>[]>(
    () => [
      {
        header: isMobile
          ? "Пользователь"
          : `Пользователи (${data?.users?.totalElements})`,
        footer: (props) => props.column.id,
        accessorKey: "firstName",
        cell: (info: CellContext<UserDto, unknown>) => {
          return (
            <UserRow
              user={info.row.original}
              hideAvatar={isMobile}
              hideRoles
              hideRating
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
        header: "Телефон",
        footer: (props: HeaderContext<UserDto, unknown>) => props.column.id,
        accessorKey: "phoneNumber",
      },
      {
        header: "Роль",
        footer: (props) => props.column.id,
        accessorKey: "roles",
        cell: (info: CellContext<UserDto, unknown>) =>
          isMobileOrTablet ? (
            <Typography>{info.row.original.roles}</Typography>
          ) : (
            <UpdateRole
              roles={info.row.original.roles}
              id={info.row.original.id}
            />
          ),
        size: isMobileOrTablet ? 110 : 160,
      },
      {
        header: "Дата\u00A0регистрации",
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { creationDate, locked, id } = info.row.original;

          return (
            <StyledAlignStack position="relative">
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
    [isMobile, isMobileOrTablet]
  );

  return <Table {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
