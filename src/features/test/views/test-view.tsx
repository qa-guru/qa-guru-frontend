import { FC } from "react";
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
  onAnswerSelect,
  onNextQuestion,
  onSubmitTest,
}) => {
  const getUserAnswerForQuestion = (questionId: string) => {
    return userAnswers.find((ua) => ua.questionId === questionId)?.answerId;
  };

  const successThreshold = testData.successThreshold ?? 0;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isPassed = score >= successThreshold;

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
                ? `Поздравляем! Вы прошли тест с результатом ${score}/${totalQuestions}`
                : `Тест не пройден. Результат: ${score}/${totalQuestions}. Требуется: ${successThreshold}`}
            </Alert>

            <Typography variant="body1">
              Правильных ответов: {score} из {totalQuestions}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Проходной балл: {successThreshold}
            </Typography>
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
