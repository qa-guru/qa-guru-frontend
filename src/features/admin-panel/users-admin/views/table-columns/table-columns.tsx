import { FC, useMemo } from "react";
import {
  type CellContext,
  type ColumnDef,
  type HeaderContext,
} from "@tanstack/react-table";
import { Typography } from "@mui/material";

import { UserDto } from "api/graphql/generated/graphql";
import { formatDate, formatRole } from "shared/helpers";
import UserRow from "shared/components/user-row";
import Rating from "shared/components/rating";
import { useResponsive } from "shared/hooks";

import {
  StyledAlignStack,
  StyledDate,
  StyledEmail,
  StyledMobileBox,
  StyledRating,
  StyledRatingBox,
  StyledRightAlignBox,
  StyledUserRowBox,
} from "./table-columns.styled";
import { ITableColumns } from "./table-columns.types";
import Table from "../table";
import { UpdateRole } from "../../containers";
import UserSettings from "../user-settings";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const { isMobile, isMobileOrTablet } = useResponsive();

  const desktopColumns = useMemo<ColumnDef<UserDto>[]>(
    () => [
      {
        header: `Пользователи (${data?.users?.totalElements})`,
        footer: (props) => props.column.id,
        accessorKey: "firstName",
        cell: (info: CellContext<UserDto, unknown>) => {
          return (
            <UserRow
              user={info.row.original}
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
        cell: (info: CellContext<UserDto, unknown>) => (
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
            <StyledAlignStack>
              <Typography variant="body2">
                {formatDate(creationDate, "DD.MM.YYYY")}
              </Typography>
              <StyledRightAlignBox>
                <UserSettings
                  id={id}
                  user={info.row.original}
                  locked={locked}
                />
              </StyledRightAlignBox>
            </StyledAlignStack>
          );
        },
      },
    ],
    [isMobileOrTablet]
  );

  const mobileColumns = useMemo<ColumnDef<UserDto>[]>(
    () => [
      {
        header: "",
        footer: (props) => props.column.id,
        accessorKey: "firstName",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { locked, id } = info.row.original;

          return (
            <>
              <StyledUserRowBox>
                <UserRow
                  user={info.row.original}
                  hideRating
                  roles={info.row.original.roles}
                  userId={info.row.original.id}
                  variant="body1"
                  hasLink
                />
              </StyledUserRowBox>
              <StyledRightAlignBox>
                <UserSettings
                  id={id}
                  user={info.row.original}
                  locked={locked}
                />
              </StyledRightAlignBox>
            </>
          );
        },
      },
      {
        header: () => {
          return <StyledRating variant="body2">Рейтинг</StyledRating>;
        },
        footer: (props) => props.column.id,
        accessorKey: "rating.rating",
        cell: (info: CellContext<UserDto, unknown>) => {
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
          return <Typography variant="body2">E-mail</Typography>;
        },
        footer: (props) => props.column.id,
        accessorKey: "email",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { email } = info.row.original;

          return (
            <StyledMobileBox>
              <StyledEmail variant="caption">{email}</StyledEmail>
            </StyledMobileBox>
          );
        },
      },
      {
        header: () => {
          return <Typography variant="body2">Роль</Typography>;
        },
        footer: (props) => props.column.id,
        accessorKey: "roles",
        cell: (info: CellContext<UserDto, unknown>) => {
          const { roles } = info.row.original;

          return (
            <StyledMobileBox>
              <Typography variant="body2">{formatRole(roles)}</Typography>
            </StyledMobileBox>
          );
        },
      },
      {
        header: () => {
          return <StyledDate variant="body2">Дата регистрации</StyledDate>;
        },
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<UserDto, unknown>) => {
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

  return <Table {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
