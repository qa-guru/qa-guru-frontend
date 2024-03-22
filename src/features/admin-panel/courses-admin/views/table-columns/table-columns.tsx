import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { TrainingDto } from "api/graphql/generated/graphql";
import { FC, Fragment, useMemo } from "react";
import { Avatar, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import UserRow from "shared/components/user-row";
import { Stack } from "@mui/system";

import TableAdmin from "../table";
import { ITableColumns } from "./table-columns.types";
import { StyledIconButton } from "./table-columns.styled";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const columns = useMemo<ColumnDef<TrainingDto>[]>(
    () => [
      {
        header: "Название курса",
        footer: (props) => props.column.id,
        accessorKey: "name",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { name, picture } = info.row.original;

          return (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                src={`data:image/png;base64, ${picture}` || ""}
                variant="rounded"
                alt="Picture Training"
              />
              <Typography variant="body2">{name}</Typography>
            </Stack>
          );
        },
        size: 180,
      },
      {
        header: "Менторы",
        footer: (props) => props.column.id,
        accessorKey: "rating.rating",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { mentors } = info.row.original;

          return (
            <>
              {mentors?.map((mentor) => {
                const { id, roles } = mentor!;

                return (
                  <Fragment key={id}>
                    <UserRow
                      user={mentor}
                      hideRating
                      roles={roles}
                      userId={id}
                      hasLink
                    />
                  </Fragment>
                );
              })}
            </>
          );
        },
        size: 120,
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "lock",
        cell: () => {
          return (
            <StyledIconButton>
              <ModeEditIcon fontSize="small" color="primary" />
            </StyledIconButton>
          );
        },
        size: 10,
      },
    ],
    []
  );

  return <TableAdmin {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
