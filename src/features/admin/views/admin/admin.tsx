import { FC, useMemo } from "react";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { formatRole } from "shared/hooks/format-role";
import AvatarCustom from "shared/components/avatar-custom";
import { UserDto } from "api/graphql/generated/graphql";
import { StyledAlignStack, StyledRightAlignBox } from "./admin.styled";
import { IAdmin } from "./admin.types";
import TableAdmin from "../table-admin";
import LockUser from "../../containers/lock-user";
import UnlockUser from "../../containers/unlock-user";

const Admin: FC<IAdmin> = ({ data, fetchMore }) => {
  const formatDate = (date: number) => {
    return dayjs(date).format("DD.MM.YYYY");
  };

  const columns = useMemo<ColumnDef<UserDto>[]>(
    () => [
      {
        header: "Пользователь",
        footer: (props) => props.column.id,
        accessorKey: "id",
        cell: (info: CellContext<UserDto, unknown>) => (
          <StyledAlignStack>
            <AvatarCustom
              fullName={`${info.row.original.firstName} ${info.row.original.lastName}`}
            />
            <Typography variant="body2">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Typography>
          </StyledAlignStack>
        ),
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
        cell: (info: CellContext<UserDto, unknown>) =>
          formatRole(info.row.original.roles!.toString()),
      },
      {
        header: "Дата регистрации",
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<UserDto, unknown>) => {
          return (
            <StyledAlignStack>
              <Typography variant="body2">
                {formatDate(info.row.original.creationDate!)}
              </Typography>
              <StyledRightAlignBox>
                {info.row.original.locked ? (
                  <UnlockUser id={info.row.original.id} />
                ) : (
                  <LockUser id={info.row.original.id} />
                )}
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
