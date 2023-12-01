import { FC, MouseEvent, useMemo } from "react";
import {
  // eslint-disable-next-line import/named
  CellContext,
  // eslint-disable-next-line import/named
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Container,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { formatRole } from "shared/hooks/format-role";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Lock,
  LockOpen,
} from "@mui/icons-material";
import AvatarCustom from "shared/components/avatar-custom";
import { useTheme } from "@mui/system";
// eslint-disable-next-line import/named
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import { IAdmin, IUser } from "./admin.types";
import {
  StyledAlignStack,
  StyledIconBox,
  StyledPaper,
  StyledRightAlignBox,
  StyledTable,
  StyledTitle,
} from "./admin.styled";

const Admin: FC<IAdmin> = ({ data }) => {
  const users = data?.users?.items;
  const formatDate = (date: number) => {
    return dayjs(date).format("DD.MM.YYYY");
  };

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        header: "Пользователь",
        accessorKey: "id",
        cell: (info: CellContext<IUser, unknown>) => (
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
        cell: (info: CellContext<IUser, unknown>) =>
          formatRole(info.row.original.roles!.toString()),
      },
      {
        header: "Дата регистрации",
        accessorKey: "creationDate",
        cell: (info: CellContext<IUser, unknown>) => (
          <StyledAlignStack>
            <Typography variant="body2">
              {formatDate(info.row.original.creationDate!)}
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
    ],
    []
  );

  const table = useReactTable({
    data: users as IUser[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const { pageSize, pageIndex } = table.getState().pagination;

  const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <StyledIconBox>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
        </IconButton>
      </StyledIconBox>
    );
  };

  // const customFilter = (options, { inputValue }: { inputValue: string }) => {
  //   return options.filter(
  //     (option) =>
  //       option.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
  //       option.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
  //       option.email.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

  return (
    <Container>
      <StyledTitle variant="h2">Пользователи</StyledTitle>
      <StyledPaper>
        {/*<StyledAutocomplete*/}
        {/*  id="free-solo-demo"*/}
        {/*  freeSolo*/}
        {/*  options={users!}*/}
        {/*  getOptionLabel={(option) =>*/}
        {/*    `${option?.firstName} ${option?.lastName}`*/}
        {/*  }*/}
        {/*  filterOptions={customFilter}*/}
        {/*  renderInput={(params) => (*/}
        {/*    <TextField {...params} label="Имя пользователя или e-mail" />*/}
        {/*  )}*/}
        {/*/>*/}
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
        <TablePagination
          rowsPerPageOptions={[
            6,
            10,
            25,
            { label: "All", value: data?.users?.totalElements },
          ]}
          component="div"
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page);
          }}
          onRowsPerPageChange={(e) => {
            const size = e.target.value ? Number(e.target.value) : 10;
            table.setPageSize(size);
          }}
          ActionsComponent={TablePaginationActions}
        />
      </StyledPaper>
    </Container>
  );
};

export default Admin;
