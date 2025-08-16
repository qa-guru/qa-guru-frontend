import { FC } from "react";
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
} from "@mui/icons-material";

import { TestGroupDto } from "api/graphql/generated/graphql";

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

  const handleStartTest = () => {
    // Проверяем наличие всех необходимых параметров
    if (!testGroup?.id || !trainingId || !lectureId) {
      console.error("Missing required parameters for test navigation:", {
        testId: testGroup?.id,
        trainingId,
        lectureId,
      });
      return;
    }

    // Переходим на страницу теста с параметрами
    navigate(`/test/${testGroup.id}/${trainingId}/${lectureId}`);
  };

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
                label={`Проходной балл: ${testGroup.successThreshold}%`}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`Вопросов: ${testGroup.testQuestions?.length || 0}`}
                variant="outlined"
              />
            </Stack>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Пройдите тест, чтобы закрепить изученный материал. Для успешного
              прохождения необходимо набрать минимум{" "}
              {testGroup.successThreshold}% правильных ответов.
            </Typography>
          </Alert>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayIcon />}
              onClick={handleStartTest}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: "1.1rem",
              }}
            >
              Начать тестирование
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LectureTestSection;
