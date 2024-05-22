import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { Maybe, TrainingDto } from "api/graphql/generated/graphql";
import { FC, Fragment, MouseEvent, useMemo, useState } from "react";
import { Avatar, IconButton, Popover, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import UserRow from "shared/components/user-row";
import { Stack } from "@mui/system";
import useResponsive from "shared/hooks/use-responsive";
import { useLocation, useNavigate } from "react-router-dom";

import TableAdmin from "../table";
import { ITableColumns } from "./table-columns.types";
import {
  StyledEditBox,
  StyledTrainingStack,
  StyledUserRowBox,
  StyledAvatarGroup,
  StyledTeachersBox,
  StyledUserRowStack,
} from "./table-columns.styled";

const TableColumns: FC<ITableColumns> = ({ data, fetchMore }) => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<Maybe<HTMLElement>>(null);
  const [openMentorsById, setOpenMentorsById] = useState<string | null>(null);

  const handleNavigateEditCourse = (trainingId: string) => {
    navigate(`${location.pathname}/edit-training/${trainingId}`);
  };

  const toggleMentorsMenu = (event: MouseEvent<HTMLElement>, id: string) => {
    if (openMentorsById === id) {
      setOpenMentorsById(null);
    } else {
      setOpenMentorsById(id);
      setAnchorEl(event.currentTarget);
    }
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
        size: 180,
      },
      {
        header: "Менторы",
        footer: (props) => props.column.id,
        accessorKey: "rating.rating",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { mentors, id } = info.row.original;
          const [firstMentor, ...otherMentors] = mentors || [];

          return (
            <StyledUserRowStack>
              <UserRow
                user={firstMentor}
                userId={firstMentor?.id}
                width="35px"
                height="35px"
                hasLink
              />
              {otherMentors.length > 0 && (
                <StyledAvatarGroup
                  total={otherMentors.length}
                  max={3}
                  variant="rounded"
                  onClick={(event) => toggleMentorsMenu(event, id)}
                >
                  {otherMentors.map((mentor) => (
                    <UserRow
                      user={mentor}
                      userId={mentor?.id}
                      hideFullName
                      hideRating
                      key={mentor?.id}
                    />
                  ))}
                </StyledAvatarGroup>
              )}
              <Popover
                id={id}
                open={openMentorsById === id}
                anchorEl={anchorEl}
                onClose={(event: MouseEvent<HTMLElement>) =>
                  toggleMentorsMenu(event, id!)
                }
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <StyledTeachersBox>
                  {mentors?.map((mentor) => (
                    <StyledTeachersBox key={mentor?.id}>
                      <UserRow user={mentor} userId={mentor?.id} hasLink />
                    </StyledTeachersBox>
                  ))}
                </StyledTeachersBox>
              </Popover>
            </StyledUserRowStack>
          );
        },
        size: 120,
      },
      {
        header: () => null,
        footer: (props) => props.column.id,
        accessorKey: "lock",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { id } = info.row.original;

          return (
            <StyledEditBox>
              <IconButton onClick={() => handleNavigateEditCourse(id)}>
                <ModeEditIcon fontSize="small" color="primary" />
              </IconButton>
            </StyledEditBox>
          );
        },
        size: 10,
      },
    ],
    [openMentorsById, anchorEl]
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
        accessorKey: "lock",
        cell: (info: CellContext<TrainingDto, unknown>) => {
          const { id } = info.row.original;

          return (
            <StyledEditBox>
              <IconButton onClick={() => handleNavigateEditCourse(id)}>
                <ModeEditIcon fontSize="small" color="primary" />
              </IconButton>
            </StyledEditBox>
          );
        },
        size: 10,
      },
    ],
    [openMentorsById, anchorEl]
  );

  const columns = isMobile ? mobileColumns : desktopColumns;

  return <TableAdmin {...{ data, columns, fetchMore }} />;
};

export default TableColumns;
