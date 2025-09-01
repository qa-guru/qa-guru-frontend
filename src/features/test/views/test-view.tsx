import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Alert,
  LinearProgress,
} from "@mui/material";

import { TestGroupDto } from "api/graphql/generated/graphql";

interface TestQuestion {
  id: string;
  text: string;
}

interface TestAnswer {
  id: string;
  text: string;
  correct: boolean;
  testQuestion: TestQuestion;
}

interface UserAnswer {
  questionId: string;
  answerId: string;
}

interface TestViewProps {
  testData: TestGroupDto;
  testAnswers: TestAnswer[];
  userAnswers: UserAnswer[];
  isCompleted: boolean;
  score: number;
  currentQuestion: TestQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  isCurrentQuestionAnswered: boolean;
  trainingId?: string;
  lectureId?: string;
  testStarted: boolean;
  onAnswerSelect: (answerId: string) => void;
  onNextQuestion: () => void;
  errorMessage?: string | null;
  successMessage?: string | null;
}

const TestView: FC<TestViewProps> = ({
  testData,
  testAnswers,
  userAnswers,
  isCompleted,
  score,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  isCurrentQuestionAnswered,
  trainingId,
  lectureId,
  testStarted,
  onAnswerSelect,
  onNextQuestion,
  errorMessage,
  successMessage,
}) => {
  const navigate = useNavigate();

  const handleBackToLecture = () => {
    if (trainingId && lectureId) {
      navigate(`/training/${trainingId}/${lectureId}`);
    }
  };

  const getUserAnswerForQuestion = (questionId: string) => {
    return userAnswers.find((ua) => ua.questionId === questionId)?.answerId;
  };

  const successThreshold = testData.successThreshold ?? 0;

  const isPassed = score >= successThreshold;

  if (!testStarted) {
    return (
      <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Подготовка к тесту...
            </Typography>
            <LinearProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Инициализация теста...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (isCompleted) {
    return (
      <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Тест завершён!
            </Typography>

            <Alert severity={isPassed ? "success" : "error"} sx={{ mb: 2 }}>
              {isPassed
                ? `Поздравляем! Вы прошли тест с результатом ${score} правильных ответов из ${totalQuestions}`
                : `Тест не пройден. Результат: ${score} правильных ответов из ${totalQuestions}. Требуется: ${successThreshold} правильных ответов`}
            </Alert>

            <Typography variant="body1">
              Правильных ответов: {score} из {totalQuestions}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Проходной балл: {successThreshold} правильных ответов
            </Typography>

            {trainingId && lectureId && (
              <Button
                variant="outlined"
                onClick={handleBackToLecture}
                sx={{ mt: 2 }}
              >
                Вернуться к лекции
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }

  const selectedAnswer = getUserAnswerForQuestion(currentQuestion.id);
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {testData.testName}
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {trainingId && lectureId && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Курс ID: {trainingId} | Лекция ID: {lectureId}
          </Typography>
          <Button variant="outlined" size="small" onClick={handleBackToLecture}>
            Вернуться к лекции
          </Button>
        </Box>
      )}

      <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Прогресс:</strong> {currentQuestionIndex + 1} из{" "}
          {totalQuestions} вопросов
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Правильных ответов:</strong> {score} из {successThreshold}{" "}
          необходимых
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Статус:</strong>{" "}
          {isPassed ? "✅ Тест пройден" : "❌ Тест не пройден"}
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {currentQuestionIndex + 1}. {currentQuestion.text}
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              value={selectedAnswer || ""}
              onChange={(e) => onAnswerSelect(e.target.value)}
            >
              {testAnswers.map((answer) => (
                <FormControlLabel
                  key={answer.id}
                  value={answer.id}
                  control={<Radio />}
                  label={answer.text}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {userAnswers.length} из {totalQuestions} вопросов отвечено
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={onNextQuestion}
          disabled={!isCurrentQuestionAnswered}
        >
          {isLastQuestion ? "Завершить тест" : "Далее"}
        </Button>
      </Box>
    </Box>
  );
};

export default TestView;
