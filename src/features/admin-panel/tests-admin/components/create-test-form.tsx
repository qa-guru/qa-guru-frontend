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

  useEffect(() => {
    if (existingTest) {
      setTestName(existingTest.testName || "");
      setSuccessThreshold(existingTest.successThreshold || 70);

      const loadQuestionsWithAnswers = async () => {
        const loadedQuestions: QuestionForm[] = [];

        for (const question of existingTest.testQuestions || []) {
          if (!question?.id) continue;

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

  const validateForm = () => {
    if (!testName.trim()) {
      return "Название теста обязательно";
    }
    if (successThreshold < 1) {
      return "Проходной балл должен быть не менее 1 правильного ответа";
    }
    if (successThreshold > questions.length) {
      return "Проходной балл не может быть больше количества вопросов";
    }
    if (questions.length === 0) {
      return "Добавьте хотя бы один вопрос";
    }
    return null;
  };

  const handleSave = () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
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
                type="number"
                label="Проходной балл (количество правильных ответов)"
                value={successThreshold}
                onChange={(e) => setSuccessThreshold(Number(e.target.value))}
                fullWidth
                margin="normal"
                helperText="Минимальное количество правильных ответов для прохождения теста"
                inputProps={{ min: 1, max: questions.length }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
