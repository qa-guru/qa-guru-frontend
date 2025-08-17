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

// Типы (дублируем из контейнера, потом вынесем в отдельный файл)
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
  onAnswerSelect: (questionId: string, answerId: string) => void;
  onNextQuestion: () => void;
  onSubmitTest: () => void;
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
  onAnswerSelect,
  onNextQuestion,
  onSubmitTest,
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
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const scorePercentage = (score / totalQuestions) * 100;
  const isPassed = scorePercentage >= successThreshold;

  // Отладочная информация
  console.log("🔍 TestView Debug:", {
    score,
    totalQuestions,
    successThreshold,
    scorePercentage: scorePercentage.toFixed(1) + "%",
    isPassed,
  });

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
                ? `Поздравляем! Вы прошли тест с результатом ${scorePercentage.toFixed(
                    0
                  )}% (${score}/${totalQuestions})`
                : `Тест не пройден. Результат: ${scorePercentage.toFixed(
                    0
                  )}% (${score}/${totalQuestions}). Требуется: ${successThreshold}%`}
            </Alert>

            <Typography variant="body1">
              Правильных ответов: {score} из {totalQuestions}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Проходной балл: {successThreshold}%
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

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Вопрос {currentQuestionIndex + 1} из {totalQuestions}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {currentQuestionIndex + 1}. {currentQuestion.text}
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              value={selectedAnswer || ""}
              onChange={(e) =>
                onAnswerSelect(currentQuestion.id, e.target.value)
              }
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
          onClick={isLastQuestion ? onSubmitTest : onNextQuestion}
          disabled={!isCurrentQuestionAnswered}
        >
          {isLastQuestion ? "Завершить тест" : "Далее"}
        </Button>
      </Box>
    </Box>
  );
};

export default TestView;
