import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { Maybe, TrainingLectureDto } from "api/graphql/generated/graphql";
import { FC, useMemo } from "react";
import { IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useResponsive } from "shared/hooks";
import { useLocation, useNavigate } from "react-router-dom";

import TableAdmin from "../table";
import { ITableColumns } from "./table-columns.types";
import { StyledBox, StyledEditBox } from "./table-columns.styled";
import { DeleteLecture } from "../../containers";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();

  const lectureIds = data?.trainingLectures?.map(
    (trainingLecture) => trainingLecture?.lecture?.id!
  );

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
      // {
      //   header: "Ведущие преподаватели",
      //   footer: (props) => props.column.id,
      //   accessorKey: "mentors",
      //   cell: (info: CellContext<TrainingLectureDto, unknown>) => {
      //     const { mentors } = info.row.original.lecture;
      //
      //     return (
      //       <StyledTeachersBox>
      //         {mentors?.map((mentor) => (
      //           <StyledTeachersBox key={mentor?.id}>
      //             <UserRow user={mentor} userId={mentor?.id} hasLink />
      //           </StyledTeachersBox>
      //         ))}
      //       </StyledTeachersBox>
      //     );
      //   },
      //   size: 120,
      // },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "edit",
        cell: (info: CellContext<TrainingLectureDto, unknown>) => {
          const { id: lectureId } = info.row.original;

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
      // {
      //   header: () => null,
      //   footer: (props) => props.column.id,
      //   accessorKey: "rating.rating",
      //   cell: (info: CellContext<TrainingDto, unknown>) => {
      //     const { mentors } = info.row.original;
      //
      //     return (
      //       <>
      //         {mentors?.map((mentor) => {
      //           const { id, roles } = mentor!;
      //
      //           return (
      //             <Fragment key={id}>
      //               <StyledUserRowBox>
      //                 <UserRow
      //                   user={mentor}
      //                   hideRating
      //                   roles={roles}
      //                   userId={id}
      //                   hasLink
      //                 />
      //               </StyledUserRowBox>
      //             </Fragment>
      //           );
      //         })}
      //       </>
      //     );
      //   },
      //   size: 120,
      // },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "edit",
        cell: (info: CellContext<TrainingLectureDto, unknown>) => {
          const { id: lectureId } = info.row.original;

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

  return <TableAdmin {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
