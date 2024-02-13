import { FC, useMemo } from "react";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  type CellContext,
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserRatingDto } from "api/graphql/generated/graphql";
import UserRow from "shared/components/user-row";
import { formatDate } from "shared/helpers";
import Rating from "shared/components/rating/rating";

import { IUsers } from "./users.types";
import {
  StyledPaper,
  StyledTitle,
} from "../../../admin/views/table-admin/table-admin.styled";
import MobileTable from "../../views/mobile-table";
import DesktopTable from "../../views/desktop-table";

const Users: FC<IUsers> = ({ data }) => {
  const users = data.usersRating?.items;
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isOnlyXs = useMediaQuery(theme.breakpoints.only("xs"));

  const columns = useMemo<ColumnDef<UserRatingDto>[]>(
    () => [
      {
        header: "Пользователь",
        footer: (props) => props.column.id,
        accessorKey: "id",
        cell: (info: CellContext<UserRatingDto, unknown>) => {
          const { firstName, lastName } = info.row.original;

          return (
            <UserRow
              userId={info.row.original.id}
              hideAvatar={isOnlyXs}
              hideRoles
              firstName={firstName}
              lastName={lastName}
              hideRating
              hasLink
            />
          );
        },
      },
      {
        header: "Рейтинг",
        footer: (props) => props.column.id,
        accessorKey: "rating.rating",
        cell: (info: CellContext<UserRatingDto, unknown>) => {
          const { rating } = info.row.original;

          return <Rating rating={rating} />;
        },
      },
      {
        header: "Дата\u00A0регистрации",
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<UserRatingDto, unknown>) => {
          const { creationDate } = info.row.original;

          return (
            <Typography variant="body2">
              {formatDate(creationDate, "DD.MM.YYYY")}
            </Typography>
          );
        },
      },
    ],
    [isOnlyXs]
  );

  const table = useReactTable({
    data: users as UserRatingDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <StyledTitle variant="h2">{"Топ 50"}</StyledTitle>
      <StyledPaper>
        {isDownMd ? (
          <MobileTable table={table} />
        ) : (
          <DesktopTable table={table} />
        )}
      </StyledPaper>
    </Container>
  );
};

export default Users;
