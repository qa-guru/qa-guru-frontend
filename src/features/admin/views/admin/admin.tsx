import { FC, useMemo } from "react";
import {
  type CellContext,
  type ColumnDef,
  type HeaderContext,
} from "@tanstack/react-table";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import { formatDate } from "shared/helpers";
import UserRow from "shared/components/user-row";

import Rating from "shared/components/rating";
import { StyledAlignStack, StyledRightAlignBox } from "./admin.styled";
import { IAdmin } from "./admin.types";
import TableAdmin from "../table-admin";
import { LockUser, UnlockUser, UpdateRole } from "../../containers";

const Admin: FC<IAdmin> = ({ data, fetchMore }) => {
  const theme = useTheme();
  const isOnlyXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

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
      },

      ...(!isDownMd
        ? [
            {
              header: "E-mail",
              footer: (props: HeaderContext<UserDto, unknown>) =>
                props.column.id,
              accessorKey: "email",
            },
          ]
        : []),

      {
        header: "Роль",
        footer: (props) => props.column.id,
        accessorKey: "roles",
        cell: (info: CellContext<UserDto, unknown>) => (
          <UpdateRole
            roles={info.row.original.roles}
            id={info.row.original.id}
          />
        ),
      },
      {
        header: "Дата\u00A0регистрации",
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
    [isOnlyXs]
  );

  return <TableAdmin {...{ data, columns, fetchMore }} />;
};

export default Admin;
