import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Pagination,
  Avatar,
  Stack,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Book as BookIcon,
} from "@mui/icons-material";

import {
  useTestAttemptsAllQuery,
  TestAttemptSort,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

const TestAttemptsList: FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<any>("START_TIME");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  const {
    data: attemptsData,
    loading,
    error,
    refetch,
  } = useTestAttemptsAllQuery({
    variables: {
      offset: page * pageSize,
      limit: pageSize,
      sort: {
        field: sortField as any,
        order: sortOrder as any,
      },
    },
  });

  const handleViewAttempt = (attemptId: string) => {
    navigate(`/test-attempts/${attemptId}`);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPage(0);
  };

  const handleSortChange = (field: keyof TestAttemptSort) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortField(field);
      setSortOrder("DESC");
    }
  };

  const filteredAttempts =
    attemptsData?.testAttemptsAll?.items?.filter((attempt) => {
      if (!attempt) return false;

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          attempt.id?.toLowerCase().includes(searchLower) ||
          attempt.studentName?.toLowerCase().includes(searchLower) ||
          attempt.trainingName?.toLowerCase().includes(searchLower) ||
          attempt.lectureSubject?.toLowerCase().includes(searchLower) ||
          attempt.testGroupName?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    }) || [];

  const getStatusChip = (attempt: any) => {
    if (!attempt.result && !attempt.endTime) {
      return <Chip label="В процессе" color="warning" size="small" />;
    } else if (attempt.result) {
      return <Chip label="Пройден" color="success" size="small" />;
    } else {
      return <Chip label="Не пройден" color="error" size="small" />;
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Не завершен";
    return new Date(dateString).toLocaleString("ru-RU");
  };

  const getScoreDisplay = (attempt: any) => {
    if (attempt.successfulCount === null || attempt.errorsCount === null) {
      return "Тест не завершен";
    }
    const total = attempt.successfulCount + attempt.errorsCount;
    if (total === 0) return "0 правильных ответов";
    return `${attempt.successfulCount} из ${total} правильных ответов`;
  };

  if (loading) return <AppSpinner />;
  if (error) return <NoDataErrorMessage />;

  const pagination = attemptsData?.testAttemptsAll;
  const totalPages = pagination
    ? Math.ceil(pagination.totalElements / pageSize)
    : 0;
  const currentPage = page + 1;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Результаты тестирования</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Обновить
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Поиск по студенту, курсу или лекции"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Сортировка</InputLabel>
                <Select
                  value={sortField}
                  label="Сортировка"
                  onChange={(e) =>
                    handleSortChange(e.target.value as keyof TestAttemptSort)
                  }
                >
                  <MenuItem value="START_TIME">По времени начала</MenuItem>
                  <MenuItem value="END_TIME">По времени завершения</MenuItem>
                  <MenuItem value="SUCCESSFUL_COUNT">
                    По правильным ответам
                  </MenuItem>
                  <MenuItem value="ERRORS_COUNT">По ошибкам</MenuItem>
                  <MenuItem value="RESULT">По результату</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SortIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                  {sortOrder === "ASC" ? "По возрастанию" : "По убыванию"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Всего попыток:
              </Typography>
              <Typography variant="h6">
                {pagination?.totalElements || 0}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Страница:
              </Typography>
              <Typography variant="h6">
                {currentPage} из {totalPages}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Размер страницы:
              </Typography>
              <Typography variant="h6">{pageSize}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Показано:
              </Typography>
              <Typography variant="h6">{filteredAttempts.length}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Студент</TableCell>
              <TableCell>Курс</TableCell>
              <TableCell>Лекция</TableCell>
              <TableCell>Тест</TableCell>
              <TableCell>Время начала</TableCell>
              <TableCell>Время завершения</TableCell>
              <TableCell>Результат</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttempts.map((attempt) => {
              if (!attempt) return null;

              return (
                <TableRow key={attempt.id} hover>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {attempt.studentName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Студент
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SchoolIcon color="primary" />
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {attempt.trainingName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Курс
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <BookIcon color="secondary" />
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {attempt.lectureSubject}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Лекция
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {attempt.testGroupName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Тест
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {attempt.startTime ? formatDate(attempt.startTime) : "-"}
                  </TableCell>
                  <TableCell>
                    {attempt.endTime ? formatDate(attempt.endTime) : "-"}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {getScoreDisplay(attempt)}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
                        <Chip
                          label={attempt.successfulCount || 0}
                          color="success"
                          variant="outlined"
                          size="small"
                        />
                        <Chip
                          label={attempt.errorsCount || 0}
                          color="error"
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {attempt.result !== null ? (
                      <Chip
                        label={attempt.result ? "Да" : "Нет"}
                        color={attempt.result ? "success" : "error"}
                        size="small"
                      />
                    ) : (
                      <Chip label="Не определен" color="default" size="small" />
                    )}
                  </TableCell>
                  <TableCell>{getStatusChip(attempt)}</TableCell>
                  <TableCell>
                    <Tooltip title="Просмотреть детали">
                      <IconButton
                        color="primary"
                        onClick={() => handleViewAttempt(attempt.id!)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {filteredAttempts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Попытки тестирования не найдены
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TestAttemptsList;
