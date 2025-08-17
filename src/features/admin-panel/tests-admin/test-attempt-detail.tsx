import React, { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Alert,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";

import { useTestAttemptQuery } from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

const TestAttemptDetail: FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  const {
    data: attemptData,
    loading: attemptLoading,
    error: attemptError,
  } = useTestAttemptQuery({
    variables: { id: attemptId! },
    skip: !attemptId,
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  if (attemptLoading || !attemptData?.testAttempt) return <AppSpinner />;
  if (attemptError || !attemptData?.testAttempt) return <NoDataErrorMessage />;

  const attempt = attemptData.testAttempt;
  const questions = attempt.testAttemptQuestionResults || [];

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Не завершен";
    return new Date(dateString).toLocaleString("ru-RU");
  };

  const getDuration = () => {
    if (!attempt.startTime || !attempt.endTime) return "Не определено";
    const start = new Date(attempt.startTime);
    const end = new Date(attempt.endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.round(diffMs / 60000);
    return `${diffMins} минут`;
  };

  const getScorePercentage = () => {
    const total = (attempt.successfulCount || 0) + (attempt.errorsCount || 0);
    if (total === 0) return 0;
    return Math.round(((attempt.successfulCount || 0) / total) * 100);
  };

  return (
    <Box>
      {/* Хлебные крошки */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body1"
          onClick={handleGoBack}
          sx={{ cursor: "pointer" }}
        >
          Результаты тестирования
        </Link>
        <Typography color="text.primary">Попытка {attempt.id}</Typography>
      </Breadcrumbs>

      {/* Заголовок */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Детали попытки тестирования #{attempt.id}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
        >
          Назад
        </Button>
      </Box>

      {/* Основная информация о попытке */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Общая информация
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Время начала:
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(attempt.startTime)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Время завершения:
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(attempt.endTime)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Длительность:
                  </Typography>
                  <Typography variant="body1">{getDuration()}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Результат:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {attempt.result ? (
                      <>
                        <CheckCircleIcon color="success" />
                        <Typography variant="body1" color="success.main">
                          Пройден
                        </Typography>
                      </>
                    ) : attempt.result === false ? (
                      <>
                        <CancelIcon color="error" />
                        <Typography variant="body1" color="error.main">
                          Не пройден
                        </Typography>
                      </>
                    ) : (
                      <>
                        <ScheduleIcon color="warning" />
                        <Typography variant="body1" color="warning.main">
                          В процессе
                        </Typography>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Статистика
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Правильных ответов:
                  </Typography>
                  <Chip
                    label={attempt.successfulCount || 0}
                    color="success"
                    size="medium"
                    sx={{ fontSize: "1.2rem", py: 1 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Ошибок:
                  </Typography>
                  <Chip
                    label={attempt.errorsCount || 0}
                    color="error"
                    size="medium"
                    sx={{ fontSize: "1.2rem", py: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Процент правильных ответов:
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {getScorePercentage()}%
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Детали по вопросам */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Детали по вопросам
          </Typography>

          {questions.length === 0 ? (
            <Alert severity="info">
              Детальная информация по вопросам недоступна
            </Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Вопрос</TableCell>
                    <TableCell>Варианты ответов</TableCell>
                    <TableCell>Выбранные ответы</TableCell>
                    <TableCell>Результат</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions
                    .filter((questionResult) => questionResult !== null)
                    .map((questionResult, index) => {
                      const question = questionResult!.testQuestion;
                      if (!question) return null;

                      return (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant="body1" fontWeight="medium">
                              {index + 1}. {question.text}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              {questionResult.testAnswerResults?.map(
                                (answerResult) => (
                                  <Chip
                                    key={answerResult?.testAnswer?.id}
                                    label={answerResult?.testAnswer?.text}
                                    color="default"
                                    variant="outlined"
                                    size="small"
                                  />
                                )
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              {questionResult.testAnswerResults?.map(
                                (answerResult) => (
                                  <Chip
                                    key={answerResult?.testAnswer?.id}
                                    label={answerResult?.testAnswer?.text}
                                    color={
                                      answerResult?.answer
                                        ? "primary"
                                        : "default"
                                    }
                                    variant="outlined"
                                    size="small"
                                  />
                                )
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                questionResult.result
                                  ? "Правильно"
                                  : "Неправильно"
                              }
                              color={
                                questionResult.result ? "success" : "error"
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestAttemptDetail;
