import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { TrainingDto } from "api/graphql/generated/graphql";
import { FC, Fragment, useMemo } from "react";
import { Avatar, IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import UserRow from "shared/components/user-row";
import { Stack } from "@mui/system";
import { useResponsive } from "shared/hooks";
import { useNavigate } from "react-router-dom";

import TableAdmin from "../table";
import { ITableColumns } from "./table-columns.types";
import {
  StyledEditBox,
  StyledTeachersBox,
  StyledTrainingStack,
  StyledUserRowBox,
} from "./table-columns.styled";
import { DeleteTraining } from "../../containers";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const handleNavigateEditCourse = (trainingId: string) => {
    navigate(`/edit-training/${trainingId}`);
  };

  const desktopColumns = useMemo<ColumnDef<TrainingDto>[]>(
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
        size: 160,
      },
      {
        header: "Ведущие преподаватели",
        footer: (props) => props.column.id,
        accessorKey: "rating.rating",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { mentors } = info.row.original;

          return (
            <StyledTeachersBox>
              {mentors?.map((mentor) => (
                <StyledTeachersBox key={mentor?.id}>
                  <UserRow user={mentor} userId={mentor?.id} hasLink />
                </StyledTeachersBox>
              ))}
            </StyledTeachersBox>
          );
        },
        size: 120,
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "edit",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { id } = info.row.original;

          return (
            <StyledEditBox>
              <IconButton onClick={() => handleNavigateEditCourse(id)}>
                <ModeEditIcon fontSize="small" color="primary" />
              </IconButton>
              <DeleteTraining trainingId={id} />
            </StyledEditBox>
          );
        },
        size: 10,
      },
    ],
    []
  );

  const mobileColumns = useMemo<ColumnDef<TrainingDto>[]>(
    () => [
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "name",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { name, picture } = info.row.original;

          return (
            <StyledTrainingStack>
              <Avatar
                src={`data:image/png;base64, ${picture}` || ""}
                variant="rounded"
                alt="Picture Training"
              />
              <Typography variant="body2">{name}</Typography>
            </StyledTrainingStack>
          );
        },
        size: 180,
      },
      {
        header: () => null,
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
                    <StyledUserRowBox>
                      <UserRow
                        user={mentor}
                        hideRating
                        roles={roles}
                        userId={id}
                        hasLink
                      />
                    </StyledUserRowBox>
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
        accessorKey: "edit",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { id } = info.row.original;

          return (
            <StyledEditBox>
              <IconButton onClick={() => handleNavigateEditCourse(id)}>
                <ModeEditIcon fontSize="small" color="primary" />
              </IconButton>
              <DeleteTraining trainingId={id} />
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
