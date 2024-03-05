import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { TrainingDto } from "api/graphql/generated/graphql";
import { FC, Fragment, useMemo } from "react";
import { IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import Table from "../table";
import { ITableColumns } from "./table-columns.types";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const columns = useMemo<ColumnDef<TrainingDto>[]>(
    () => [
      {
        header: "Название курса",
        footer: (props) => props.column.id,
        accessorKey: "name",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { name } = info.row.original;

          return <Typography>{name}</Typography>;
        },
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
                const { id, firstName } = mentor!;

                return (
                  <Fragment key={id}>
                    <Typography>{firstName}</Typography>
                  </Fragment>
                );
              })}
            </>
          );
        },
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "lock",
        size: 5,

        cell: () => {
          return (
            <IconButton>
              <ModeEditIcon />
            </IconButton>
          );
        },
      },
    ],
    []
  );

  return <Table {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
