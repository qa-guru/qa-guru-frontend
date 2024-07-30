import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { FC, useMemo } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { LectureDto } from "api/graphql/generated/graphql";
import { useResponsive } from "shared/hooks";
import UserRow from "shared/components/user-row";
import { formatDate } from "shared/helpers";

import { ITableColumns } from "./table-columns.types";
import {
  StyledBox,
  StyledIconBox,
  StyledTeachersBox,
} from "./table-columns.styled";
import SelectLecture from "../select-lecture";
import { AddLecture } from "../../containers";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore, lectureIds }) => {
  const { isMobile } = useResponsive();
  const { trainingId } = useParams();

  const desktopColumns = useMemo<ColumnDef<LectureDto>[]>(
    () => [
      {
        header: "Название урока",
        footer: (props) => props.column.id,
        accessorKey: "subject",
        cell: (info: CellContext<LectureDto, unknown>) => {
          const { subject } = info.row.original;

          return <Typography variant="body2">{subject}</Typography>;
        },
      },
      {
        header: "Ведущие преподаватели",
        footer: (props) => props.column.id,
        accessorKey: "speakers",
        cell: (info: CellContext<LectureDto, unknown>) => {
          const { speakers } = info.row.original;

          return (
            <StyledTeachersBox>
              {speakers?.map((speaker, index) => (
                <StyledTeachersBox key={`${speaker?.id} + ${index}`}>
                  <UserRow
                    user={speaker}
                    userId={speaker?.id}
                    hasLink
                    hideAvatar
                  />
                </StyledTeachersBox>
              ))}
            </StyledTeachersBox>
          );
        },
      },
      {
        header: "Дата создания",
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<LectureDto, unknown>) => {
          const { creationDate } = info.row.original;

          return (
            <Typography variant="body2">
              {formatDate(creationDate, "DD.MM.YYYY")}
            </Typography>
          );
        },
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "add",
        cell: (info: CellContext<LectureDto, unknown>) => {
          const { id: lectureId } = info.row.original;

          return (
            <StyledIconBox>
              <AddLecture
                trainingId={trainingId}
                selectedLectureId={lectureId}
                lectureIds={lectureIds}
              />
            </StyledIconBox>
          );
        },
        size: 10,
      },
    ],
    [lectureIds]
  );

  const mobileColumns = useMemo<ColumnDef<LectureDto>[]>(
    () => [
      {
        header: "Название урока",
        footer: (props) => props.column.id,
        accessorKey: "subject",
        cell: (info: CellContext<LectureDto, unknown>) => {
          const { subject } = info.row.original;

          return (
            <StyledBox>
              <Typography variant="body2">{subject}</Typography>
            </StyledBox>
          );
        },
      },
      {
        header: () => <Typography>Ведущие преподаватели</Typography>,
        footer: (props) => props.column.id,
        accessorKey: "speakers",
        cell: (info: CellContext<LectureDto, unknown>) => {
          const { speakers } = info.row.original;

          return (
            <StyledTeachersBox>
              {speakers?.map((speaker, index) => (
                <StyledTeachersBox key={`${speaker?.id} + ${index}`}>
                  <UserRow
                    user={speaker}
                    userId={speaker?.id}
                    hasLink
                    hideAvatar
                  />
                </StyledTeachersBox>
              ))}
            </StyledTeachersBox>
          );
        },
      },
      {
        header: "Дата создания",
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<LectureDto, unknown>) => {
          const { creationDate } = info.row.original;

          return (
            <StyledBox>
              <Typography variant="body2">
                {formatDate(creationDate, "DD.MM.YYYY")}
              </Typography>
            </StyledBox>
          );
        },
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "add",
        cell: (info: CellContext<LectureDto, unknown>) => {
          const { id: lectureId } = info.row.original;

          return (
            <StyledIconBox>
              <AddLecture
                trainingId={trainingId}
                selectedLectureId={lectureId}
                lectureIds={lectureIds}
              />
            </StyledIconBox>
          );
        },
        size: 10,
      },
    ],
    [lectureIds]
  );

  const columns = isMobile ? mobileColumns : desktopColumns;

  return <SelectLecture {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
