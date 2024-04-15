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
import {
  StyledDate,
  StyledMobileBox,
  StyledPaper,
  StyledRating,
  StyledRatingBox,
  StyledTitle,
  StyledUserRowBox,
} from "./top-users.styled";

const TopUsers: FC<ITopUsers> = ({ data }) => {
  const users = data.usersRating?.items;
  const { isMobile } = useResponsive();

  const desktopColumns = useMemo<ColumnDef<UserRatingDto>[]>(
    () => [
      {
        header: "Пользователь",
        footer: (props) => props.column.id,
        accessorKey: "id",
        cell: (info: CellContext<UserRatingDto, unknown>) => {
          const user = info.row.original;

          return <UserRow {...user} hideRoles hideRating hasLink />;
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
    []
  );

  const mobileColumns = useMemo<ColumnDef<UserRatingDto>[]>(
    () => [
      {
        header: "",
        footer: (props) => props.column.id,
        accessorKey: "firstName",
        cell: (info: CellContext<UserRatingDto, unknown>) => {
          const user = info.row.original;

          return (
            <StyledUserRowBox>
              <UserRow {...user} hideRating hasLink />
            </StyledUserRowBox>
          );
        },
      },
      {
        header: () => {
          return <StyledRating variant="body2">Рейтинг</StyledRating>;
        },
        footer: (props) => props.column.id,
        accessorKey: "rating.rating",
        cell: (info: CellContext<UserRatingDto, unknown>) => {
          const { rating } = info.row.original;

          return (
            <StyledRatingBox>
              <Rating rating={rating} />
            </StyledRatingBox>
          );
        },
      },
      {
        header: () => {
          return <StyledDate variant="body2">Дата регистрации</StyledDate>;
        },
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<UserRatingDto, unknown>) => {
          const { creationDate } = info.row.original;

          return (
            <StyledMobileBox>
              <Typography variant="body2">
                {formatDate(creationDate, "DD.MM.YYYY")}
              </Typography>
            </StyledMobileBox>
          );
        },
      },
    ],
    []
  );

  const columns = isMobile ? mobileColumns : desktopColumns;

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
