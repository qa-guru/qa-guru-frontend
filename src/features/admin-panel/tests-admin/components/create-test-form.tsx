import React, { FC, useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  QuestionAnswer as QuestionIcon,
} from "@mui/icons-material";

import {
  TestGroupDto,
  useTestAnswerByQuestionLazyQuery,
} from "api/graphql/generated/graphql";

import { QuestionForm } from "../types";

interface CreateTestFormProps {
  existingTest?: TestGroupDto | null;
  onSave: (
    testName: string,
    successThreshold: number,
    questions: QuestionForm[]
  ) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CreateTestForm: FC<CreateTestFormProps> = ({
  existingTest,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [testName, setTestName] = useState("");
  const [successThreshold, setSuccessThreshold] = useState(70);
  const [questions, setQuestions] = useState<QuestionForm[]>([]);
  const [expandedQuestion, setExpandedQuestion] = useState<string | false>(
    false
  );

  const [getTestAnswers] = useTestAnswerByQuestionLazyQuery();

  // Загружаем данные существующего теста для редактирования
  useEffect(() => {
    if (existingTest) {
      setTestName(existingTest.testName || "");
      setSuccessThreshold(existingTest.successThreshold || 70);

      // Загружаем вопросы и ответы с правильностью
      const loadQuestionsWithAnswers = async () => {
        const loadedQuestions: QuestionForm[] = [];

        for (const question of existingTest.testQuestions || []) {
          if (!question?.id) continue;

          // Получаем полную информацию об ответах для каждого вопроса
          const { data: answersData } = await getTestAnswers({
            variables: { questionId: question.id },
          });

          const answers =
            answersData?.testAnswerByQuestion?.map((a) => ({
              id: a?.id || "",
              text: a?.text || "",
              correct: a?.correct || false,
            })) || [];

          loadedQuestions.push({
            id: question.id,
            text: question.text || "",
            answers:
              answers.length > 0
                ? answers
                : [
                    { text: "", correct: true },
                    { text: "", correct: false },
                  ],
          });
        }

        setQuestions(loadedQuestions);
        // Открываем первый вопрос по умолчанию
        if (loadedQuestions.length > 0) {
          setExpandedQuestion(`question-0`);
        }
      };

      loadQuestionsWithAnswers();
    }
  }, [existingTest, getTestAnswers]);

  const addQuestion = () => {
    const newQuestionIndex = questions.length;
    const newQuestion: QuestionForm = {
      text: "",
      answers: [
        { text: "", correct: true },
        { text: "", correct: false },
      ],
    };
    setQuestions([...questions, newQuestion]);
    setExpandedQuestion(`question-${newQuestionIndex}`);
  };

  const removeQuestion = (questionIndex: number) => {
    const updatedQuestions = questions.filter(
      (_, index) => index !== questionIndex
    );
    setQuestions(updatedQuestions);

    // Если удаляем активный вопрос, открываем предыдущий или следующий
    if (expandedQuestion === `question-${questionIndex}`) {
      if (updatedQuestions.length > 0) {
        const newIndex = questionIndex > 0 ? questionIndex - 1 : 0;
        setExpandedQuestion(`question-${newIndex}`);
      } else {
        setExpandedQuestion(false);
      }
    }
  };

  const updateQuestion = (questionIndex: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({
      text: "",
      correct: false,
    });
    setQuestions(updatedQuestions);
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers = updatedQuestions[
      questionIndex
    ].answers.filter((_, index) => index !== answerIndex);
    setQuestions(updatedQuestions);
  };

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    field: "text" | "correct",
    value: string | boolean
  ) => {
    const updatedQuestions = [...questions];
    if (field === "text") {
      updatedQuestions[questionIndex].answers[answerIndex].text =
        value as string;
    } else {
      updatedQuestions[questionIndex].answers[answerIndex].correct =
        value as boolean;
    }
    setQuestions(updatedQuestions);
  };

  const validateForm = (): string | null => {
    if (!testName.trim()) {
      return "Название теста обязательно";
    }

    if (successThreshold < 0 || successThreshold > 100) {
      return "Проходной балл должен быть от 0 до 100%";
    }

    if (questions.length === 0) {
      return "Добавьте хотя бы один вопрос";
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.text.trim()) {
        return `Текст вопроса ${i + 1} не может быть пустым`;
      }

      if (question.answers.length < 2) {
        return `В вопросе ${i + 1} должно быть минимум 2 варианта ответа`;
      }

      const correctAnswers = question.answers.filter((a) => a.correct);
      if (correctAnswers.length === 0) {
        return `В вопросе ${i + 1} должен быть хотя бы один правильный ответ`;
      }

      for (let j = 0; j < question.answers.length; j++) {
        if (!question.answers[j].text.trim()) {
          return `Текст ответа ${j + 1} в вопросе ${
            i + 1
          } не может быть пустым`;
        }
      }
    }

    return null;
  };

  const handleSave = () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError); // Можно заменить на более красивое уведомление
      return;
    }

    onSave(testName, successThreshold, questions);
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedQuestion(isExpanded ? panel : false);
    };

  return (
    <Box>
      {/* Основная информация о тесте */}
      <Card sx={{ mb: 4 }}>
        <CardHeader
          title="Основная информация"
          subheader="Введите название теста и установите проходной балл"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Название теста"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Например: Тест по основам JavaScript"
                required
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Проходной балл (%)"
                type="number"
                value={successThreshold}
                onChange={(e) => setSuccessThreshold(Number(e.target.value))}
                required
                disabled={isLoading}
                inputProps={{ min: 0, max: 100 }}
                helperText="Минимальный процент правильных ответов для прохождения"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Секция вопросов */}
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <QuestionIcon />
              <Typography variant="h6">Вопросы теста</Typography>
              <Chip
                label={`${questions.length} ${
                  questions.length === 1 ? "вопрос" : "вопросов"
                }`}
                size="small"
                color="primary"
              />
            </Box>
          }
          action={
            <Button
              startIcon={<AddIcon />}
              onClick={addQuestion}
              variant="contained"
              disabled={isLoading}
            >
              Добавить вопрос
            </Button>
          }
        />
        <CardContent>
          {questions.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <QuestionIcon
                sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Вопросов еще нет
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Добавьте первый вопрос для начала создания теста
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addQuestion}
                variant="contained"
                disabled={isLoading}
              >
                Добавить первый вопрос
              </Button>
            </Box>
          ) : (
            questions.map((question, questionIndex) => (
              <Accordion
                key={questionIndex}
                expanded={expandedQuestion === `question-${questionIndex}`}
                onChange={handleAccordionChange(`question-${questionIndex}`)}
                sx={{ mb: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ flexGrow: 1 }}>
                      <strong>Вопрос {questionIndex + 1}:</strong>{" "}
                      {question.text || "Новый вопрос"}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mr: 2,
                      }}
                    >
                      <Chip
                        label={`${question.answers.length} ответов`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`${
                          question.answers.filter((a) => a.correct).length
                        } правильных`}
                        size="small"
                        color={
                          question.answers.filter((a) => a.correct).length > 0
                            ? "success"
                            : "error"
                        }
                      />
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeQuestion(questionIndex);
                      }}
                      color="error"
                      disabled={isLoading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ pl: 2 }}>
                    <TextField
                      fullWidth
                      label="Текст вопроса"
                      value={question.text}
                      onChange={(e) =>
                        updateQuestion(questionIndex, e.target.value)
                      }
                      margin="normal"
                      multiline
                      rows={2}
                      placeholder="Введите текст вопроса..."
                      disabled={isLoading}
                    />

                    <Box sx={{ mt: 3, mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="medium">
                          Варианты ответов:
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => addAnswer(questionIndex)}
                          disabled={isLoading}
                        >
                          Добавить ответ
                        </Button>
                      </Box>
                    </Box>

                    {question.answers.map((answer, answerIndex) => (
                      <Box
                        key={answerIndex}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                          p: 2,
                          border: "1px solid",
                          borderColor: answer.correct
                            ? "success.main"
                            : "divider",
                          borderRadius: 1,
                          bgcolor: answer.correct
                            ? "success.light"
                            : "background.paper",
                          opacity: answer.correct ? 1 : 0.8,
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={answer.correct}
                              onChange={(e) =>
                                updateAnswer(
                                  questionIndex,
                                  answerIndex,
                                  "correct",
                                  e.target.checked
                                )
                              }
                              disabled={isLoading}
                              color="success"
                            />
                          }
                          label="Правильный"
                        />
                        <TextField
                          fullWidth
                          size="small"
                          label={`Ответ ${answerIndex + 1}`}
                          value={answer.text}
                          onChange={(e) =>
                            updateAnswer(
                              questionIndex,
                              answerIndex,
                              "text",
                              e.target.value
                            )
                          }
                          placeholder="Введите вариант ответа..."
                          disabled={isLoading}
                        />
                        <IconButton
                          size="small"
                          onClick={() =>
                            removeAnswer(questionIndex, answerIndex)
                          }
                          color="error"
                          disabled={question.answers.length <= 2 || isLoading}
                          title={
                            question.answers.length <= 2
                              ? "Минимум 2 ответа"
                              : "Удалить ответ"
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </CardContent>
      </Card>

      {/* Кнопки действий */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button onClick={onCancel} disabled={isLoading} size="large">
          Отмена
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isLoading}
          size="large"
        >
          {isLoading
            ? "Сохранение..."
            : existingTest
            ? "Обновить тест"
            : "Создать тест"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTestForm;
