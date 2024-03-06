import { FC, useMemo } from "react";
import { Container, Typography } from "@mui/material";
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
import useResponsive from "shared/hooks/use-responsive";

import { ITopUsers } from "./top-users.types";
import MobileTable from "../mobile-table";
import DesktopTable from "../desktop-table";
import { StyledPaper, StyledTitle } from "./top-users.styled";

const TopUsers: FC<ITopUsers> = ({ data }) => {
  const users = data.usersRating?.items;
  const { isMobile } = useResponsive();

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
              hideAvatar={isMobile}
              hideRoles
              firstName={firstName}
              lastName={lastName}
              hideRating
              hasLink
            />
          );
        },
        size: 200,
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
    [isMobile]
  );

  const table = useReactTable({
    data: users as UserRatingDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <StyledTitle variant="h2">Топ 50</StyledTitle>
      <StyledPaper>
        {isMobile ? (
          <MobileTable table={table} />
        ) : (
          <DesktopTable table={table} />
        )}
      </StyledPaper>
    </Container>
  );
};

export default TopUsers;
