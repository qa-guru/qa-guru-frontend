import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { Maybe, TrainingLectureDto } from "api/graphql/generated/graphql";
import { FC, useMemo } from "react";
import { IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useResponsive } from "shared/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "shared/helpers";
import UserRow from "shared/components/user-row";

import { ITableColumns } from "./table-columns.types";
import {
  StyledBox,
  StyledEditBox,
  StyledTeachersBox,
} from "./table-columns.styled";
import { DeleteLecture } from "../../containers";
import TableEditLectures from "../edit-lectures";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const { isMobile } = useResponsive();
  const { trainingLectures } = data;
  const navigate = useNavigate();
  const location = useLocation();

  const lectureIds = trainingLectures?.map(
    (trainingLecture) => trainingLecture?.lecture?.id!
  );

  const handleNavigateEditLecture = (lectureId?: Maybe<string>) => {
    navigate(`${location.pathname}/${lectureId}`);
  };

  const desktopColumns = useMemo<ColumnDef<TrainingLectureDto>[]>(
    () => [
      {
        header: "Название урока",
        footer: (props) => props.column.id,
        accessorKey: "subject",
        cell: (info: CellContext<TrainingLectureDto, unknown>) => {
          const { lecture } = info.row.original;
          const { subject } = lecture || {};

          return <Typography variant="body2">{subject}</Typography>;
        },
        size: 160,
      },
      {
        header: "Ведущие преподаватели",
        footer: (props) => props.column.id,
        accessorKey: "speakers",
        cell: (info: CellContext<TrainingLectureDto, unknown>) => {
          const { lecture } = info.row.original;
          const { speakers } = lecture || {};

          return (
            <StyledTeachersBox>
              {speakers?.map((speaker, index) => (
                <StyledTeachersBox key={`${speaker?.id} + ${index}`}>
                  <UserRow user={speaker} userId={speaker?.id} hasLink />
                </StyledTeachersBox>
              ))}
            </StyledTeachersBox>
          );
        },
        size: 160,
      },
      {
        header: "Дата создания",
        footer: (props) => props.column.id,
        accessorKey: "creationDate",
        cell: (info: CellContext<TrainingLectureDto, unknown>) => {
          const { lecture } = info.row.original;
          const { creationDate } = lecture || {};

          return (
            <Typography variant="body2">
              {formatDate(creationDate, "DD.MM.YYYY")}
            </Typography>
          );
        },
        size: 90,
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "edit",
        cell: (info: CellContext<TrainingLectureDto, unknown>) => {
          const { lecture } = info.row.original;
          const { id: lectureId } = lecture || {};

          return (
            <StyledEditBox>
              <IconButton onClick={() => handleNavigateEditLecture(lectureId)}>
                <ModeEditIcon fontSize="small" color="primary" />
              </IconButton>
              <DeleteLecture lectureId={lectureId} lectureIds={lectureIds} />
            </StyledEditBox>
          );
        },
        size: 10,
      },
    ],
    []
  );

  const mobileColumns = useMemo<ColumnDef<TrainingLectureDto>[]>(
    () => [
      {
        header: "Название урока",
        footer: (props) => props.column.id,
        accessorKey: "subject",
        cell: (info: CellContext<TrainingLectureDto, unknown>) => {
          const { lecture } = info.row.original;
          const { subject } = lecture || {};

          return (
            <StyledBox>
              <Typography variant="body2">{subject}</Typography>
            </StyledBox>
          );
        },
        size: 160,
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "edit",
        cell: (info: CellContext<TrainingLectureDto, unknown>) => {
          const { lecture } = info.row.original;
          const { id: lectureId } = lecture || {};

          const handleNavigateEditLecture = (lectureId?: Maybe<string>) => {
            navigate(`${location.pathname}/${lectureId}`);
          };

          return (
            <StyledEditBox>
              <IconButton onClick={() => handleNavigateEditLecture(lectureId)}>
                <ModeEditIcon fontSize="small" color="primary" />
              </IconButton>
              <DeleteLecture lectureId={lectureId} lectureIds={lectureIds} />
            </StyledEditBox>
          );
        },
        size: 10,
      },
    ],
    []
  );

  const columns = isMobile ? mobileColumns : desktopColumns;

  return <TableEditLectures {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
