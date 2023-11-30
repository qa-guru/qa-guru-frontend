import { FC } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { formatRole } from "shared/hooks/format-role";
import { IAdmin } from "./admin.types";
import {
  StyledAlignStack,
  StyledAutocomplete,
  StyledPaper,
  StyledRightAlignBox,
  StyledTable,
  StyledTitle,
} from "./admin.styled";
import AvatarCustom from "../../../shared/components/avatar-custom";
import { Lock, LockOpen } from "@mui/icons-material";

const Admin: FC<IAdmin> = ({ data }) => {
  const users = data?.users?.items;
  const formatDate = (date: string) => {
    return dayjs(date).format("DD.MM.YYYY");
  };

  const columns = [
    {
      header: "Пользователь",
      accessorKey: "id",
      cell: (info) => (
        <StyledAlignStack>
          <AvatarCustom
            fullName={`${info.row.original.firstName} ${info.row.original.lastName}`}
          />
          <Typography variant="body2">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Typography>
        </StyledAlignStack>
      ),
    },
    {
      header: "E-mail",
      accessorKey: "email",
    },
    {
      header: "Роль",
      accessorKey: "roles",
      accessorFn: (row) => formatRole(row.roles.toString()),
    },
    {
      header: "Дата регистрации",
      accessorKey: "creationDate",
      cell: (info) => (
        <StyledAlignStack>
          <Typography variant="body2">
            {formatDate(info.row.original.creationDate)}
          </Typography>
          <StyledRightAlignBox>
            {info.row.original.locked ? (
              <Lock color="primary" />
            ) : (
              <LockOpen color="primary" />
            )}
          </StyledRightAlignBox>
        </StyledAlignStack>
      ),
    },
  ];
  const table = useReactTable({
    data: users!,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const customFilter = (options, { inputValue }: { inputValue: string }) => {
    return options.filter(
      (option) =>
        option.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.email.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <Container>
      <StyledTitle variant="h2">Пользователи</StyledTitle>
      <StyledPaper>
        <StyledAutocomplete
          id="free-solo-demo"
          freeSolo
          options={users!}
          getOptionLabel={(option) =>
            `${option?.firstName} ${option?.lastName}`
          }
          filterOptions={customFilter}
          renderInput={(params) => (
            <TextField {...params} label="Имя пользователя или e-mail" />
          )}
        />
        <StyledTable>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    <Typography variant="subtitle2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {table.getRowModel().rows.map((row) => (
            <TableBody>
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          ))}
        </StyledTable>
      </StyledPaper>
    </Container>
  );
};

export default Admin;
