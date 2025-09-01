import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Alert,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  PlayArrow as PlayIcon,
  EmojiEvents as TrophyIcon,
  CheckCircle as CheckIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

import {
  TestGroupDto,
  useTestAttemptsByLectureQuery,
} from "api/graphql/generated/graphql";

interface LectureTestSectionProps {
  testGroup: TestGroupDto;
  trainingId?: string;
  lectureId?: string;
}

const LectureTestSection: FC<LectureTestSectionProps> = ({
  testGroup,
  trainingId,
  lectureId,
}) => {
  const navigate = useNavigate();
  const [completedAttempt, setCompletedAttempt] = useState<any>(null);

  const {
    data: attemptsData,
    loading: attemptsLoading,
    error: attemptsError,
  } = useTestAttemptsByLectureQuery({
    variables: {
      lectureId: lectureId || "",
      trainingId: trainingId || "",
    },
    skip: !lectureId || !trainingId,
  });

  useEffect(() => {
    if (attemptsData?.testAttempts) {
      const sortedAttempts = attemptsData.testAttempts
        .filter((attempt) => attempt && attempt.endTime !== null)
        .sort((a, b) => {
          if (!a || !b) return 0;
          return (
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
          );
        });

      const lastSuccessful = sortedAttempts.find(
        (attempt) => attempt && attempt.result === true
      );

      const lastUnsuccessful = !lastSuccessful
        ? sortedAttempts.find((attempt) => attempt && attempt.result === false)
        : null;

      setCompletedAttempt(lastSuccessful || lastUnsuccessful || null);
    }
  }, [attemptsData]);

  const hasUnfinishedAttempt = attemptsData?.testAttempts?.some(
    (attempt) => attempt && attempt.result === null && attempt.endTime === null
  );

  const getTestStatus = () => {
    if (completedAttempt) {
      if (completedAttempt.result === true) {
        return {
          status: "success",
          title: "Тест пройден",
          message: "🎉 Поздравляем! Вы успешно прошли тест по этой лекции.",
          icon: <CheckIcon />,
          color: "success" as const,
        };
      } else {
        return {
          status: "failed",
          title: "Тест не пройден",
          message:
            "📚 Тест был пройден, но порог прохождения не достигнут. Попробуйте пройти тест заново.",
          icon: <TrophyIcon />,
          color: "warning" as const,
        };
      }
    }
    return null;
  };

  const testStatus = getTestStatus();

  const handleStartTest = () => {
    if (!testGroup?.id || !trainingId || !lectureId) {
      console.error("Missing required parameters for test navigation:", {
        testId: testGroup?.id,
        trainingId,
        lectureId,
      });
      return;
    }

    if (hasUnfinishedAttempt) {
      const unfinishedAttempt = attemptsData?.testAttempts?.find(
        (attempt) =>
          attempt && attempt.result === null && attempt.endTime === null
      );

      if (unfinishedAttempt) {
        navigate(
          `/test/${testGroup.id}/${trainingId}/${lectureId}?attemptId=${unfinishedAttempt.id}`
        );
        return;
      }
    }

    navigate(`/test/${testGroup.id}/${trainingId}/${lectureId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ru-RU");
  };

  if (testStatus) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <QuizIcon color="primary" />
          Тест по лекции
        </Typography>

        <Card elevation={3}>
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                {testGroup.testName}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip
                  icon={testStatus.icon}
                  label={testStatus.title}
                  color={testStatus.color}
                  variant="outlined"
                />
                <Chip
                  icon={<TrophyIcon />}
                  label={`Проходной балл: ${testGroup.successThreshold} правильных ответов`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`Вопросов: ${testGroup.testQuestions?.length || 0}`}
                  variant="outlined"
                />
              </Stack>
            </Box>

            <Alert
              severity={testStatus.color}
              sx={{
                mb: 3,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body2">{testStatus.message}</Typography>
            </Alert>

            {hasUnfinishedAttempt && (
              <Alert
                severity="warning"
                sx={{
                  mb: 3,
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="body2">
                  ⚠️ У вас есть незавершенная попытка тестирования.
                </Typography>
              </Alert>
            )}

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Результат тестирования:
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Время начала:</strong>{" "}
                {formatDate(completedAttempt.startTime)}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Время завершения:</strong>{" "}
                {formatDate(completedAttempt.endTime)}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Правильных ответов:</strong>{" "}
                {completedAttempt.successfulCount} из{" "}
                {testGroup.testQuestions?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Ошибок:</strong> {completedAttempt.errorsCount}
              </Typography>

              {attemptsData?.testAttempts &&
                attemptsData.testAttempts.length > 1 && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: "background.paper",
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.primary"
                      gutterBottom
                    >
                      <strong>Статистика по всем попыткам:</strong>
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Всего попыток: {attemptsData.testAttempts.length}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Успешных:{" "}
                      {
                        attemptsData.testAttempts.filter(
                          (a) => a && a.result === true
                        ).length
                      }
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Неуспешных:{" "}
                      {
                        attemptsData.testAttempts.filter(
                          (a) => a && a.result === false
                        ).length
                      }
                    </Typography>
                    {hasUnfinishedAttempt && (
                      <Typography variant="body2" color="text.primary">
                        Незавершенных:{" "}
                        {
                          attemptsData.testAttempts.filter(
                            (a) => a && a.result === null
                          ).length
                        }
                      </Typography>
                    )}
                  </Box>
                )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<RefreshIcon />}
                onClick={handleStartTest}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                }}
              >
                {hasUnfinishedAttempt
                  ? "Продолжить тест"
                  : "Пройти тест заново"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <QuizIcon color="primary" />
        Тест по лекции
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {testGroup.testName}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Chip
                icon={<TrophyIcon />}
                label={`Проходной балл: ${testGroup.successThreshold} правильных ответов`}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`Вопросов: ${testGroup.testQuestions?.length || 0}`}
                variant="outlined"
              />
            </Stack>
          </Box>

          {attemptsError && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body2">
                Ошибка при загрузке попыток тестирования:{" "}
                {attemptsError.message}
              </Typography>
            </Alert>
          )}

          {attemptsLoading && (
            <Alert
              severity="info"
              sx={{
                mb: 3,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body2">
                Загрузка информации о попытках тестирования...
              </Typography>
            </Alert>
          )}

          {!attemptsLoading && !attemptsError && (
            <Alert
              severity="info"
              sx={{
                mb: 3,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body2">
                {hasUnfinishedAttempt
                  ? "У вас есть незавершенная попытка тестирования."
                  : "Пройдите тест, чтобы закрепить изученный материал. Для прохождения теста необходимо ответить правильно на " +
                    testGroup.successThreshold +
                    " вопросов."}
              </Typography>
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={hasUnfinishedAttempt ? <RefreshIcon /> : <PlayIcon />}
              onClick={handleStartTest}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: "1.1rem",
              }}
            >
              {hasUnfinishedAttempt ? "Продолжить тест" : "Начать тестирование"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LectureTestSection;
