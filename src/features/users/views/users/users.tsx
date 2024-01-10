import { FC, useMemo } from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import {
  type CellContext,
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserRatingDto } from "api/graphql/generated/graphql";

import { IUsers } from "./users.types";
import UserRow from "../../../../shared/components/user-row";
import {
  StyledPaper,
  StyledTitle,
} from "../../../admin/views/table-admin/table-admin.styled";
import MobileTable from "../../views/mobile-table";
import DesktopTable from "../../views/desktop-table";
import { StyledRatingChip } from "./users.styled";

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
          const { firstName, lastName, rating } = info.row.original;

          return (
            <UserRow
              hideFullName={isOnlyXs}
              hideRoles
              firstName={firstName}
              lastName={lastName}
              hideRating
              hasLink
              userId={info.row.original.id}
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

          return (
            <StyledRatingChip
              size="small"
              variant="outlined"
              label={rating?.rating}
            />
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
