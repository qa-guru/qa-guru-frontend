import { FC, useState, useEffect } from "react";
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
  Alert,
  Divider,
  Grid,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import {
  useUpdateTestGroupMutation,
  useTestTestGroupsByIdQuery,
  useUpdateTestQuestionMutation,
  useUpdateTestAnswerMutation,
  TestGroupInput,
  useTestAnswerByQuestionLazyQuery,
} from "api/graphql/generated/graphql";

import { QuestionForm } from "./types";

interface CreateTestFormProps {
  testId?: string | null;
  onTestSaved: () => void;
  onCancel: () => void;
}

const CreateTestForm: FC<CreateTestFormProps> = ({
  testId,
  onTestSaved,
  onCancel,
}) => {
  const [testName, setTestName] = useState("");
  const [successThreshold, setSuccessThreshold] = useState(70);
  const [questions, setQuestions] = useState<QuestionForm[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data: existingTestData } = useTestTestGroupsByIdQuery({
    variables: { id: testId || "" },
    skip: !testId,
  });

  const [updateTestGroup, { loading: savingTest }] =
    useUpdateTestGroupMutation();
  const [updateTestQuestion] = useUpdateTestQuestionMutation();
  const [updateTestAnswer] = useUpdateTestAnswerMutation();
  const [getTestAnswers] = useTestAnswerByQuestionLazyQuery();

  useEffect(() => {
    if (existingTestData?.testTestGroupsById) {
      const test = existingTestData.testTestGroupsById;
      setTestName(test.testName || "");
      setSuccessThreshold(test.successThreshold || 70);

      const loadQuestionsWithAnswers = async () => {
        const loadedQuestions: QuestionForm[] = [];

        for (const question of test.testQuestions || []) {
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
            answers: answers.length > 0 ? answers : [],
          });
        }

        setQuestions(loadedQuestions);
      };

      loadQuestionsWithAnswers();
    }
  }, [existingTestData, getTestAnswers]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        answers: [
          { text: "", correct: true },
          { text: "", correct: false },
        ],
      },
    ]);
  };

  const removeQuestion = (questionIndex: number) => {
    setQuestions(questions.filter((_, index) => index !== questionIndex));
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

  const validateForm = (): boolean => {
    if (!testName.trim()) {
      setError("Название теста обязательно");
      return false;
    }

    if (questions.length === 0) {
      setError("Добавьте хотя бы один вопрос");
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.text.trim()) {
        setError(`Текст вопроса ${i + 1} не может быть пустым`);
        return false;
      }

      if (question.answers.length < 2) {
        setError(`В вопросе ${i + 1} должно быть минимум 2 варианта ответа`);
        return false;
      }

      const correctAnswers = question.answers.filter((a) => a.correct);
      if (correctAnswers.length === 0) {
        setError(
          `В вопросе ${i + 1} должен быть хотя бы один правильный ответ`
        );
        return false;
      }

      for (let j = 0; j < question.answers.length; j++) {
        if (!question.answers[j].text.trim()) {
          setError(
            `Текст ответа ${j + 1} в вопросе ${i + 1} не может быть пустым`
          );
          return false;
        }
      }
    }

    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const savedQuestions: { id: string }[] = [];

      for (const question of questions) {
        const questionResult = await updateTestQuestion({
          variables: {
            input: {
              id: question.id,
              text: question.text,
            },
          },
        });

        const questionId = questionResult.data?.updateTestQuestion?.id;
        if (!questionId) throw new Error("Не удалось сохранить вопрос");

        for (const answer of question.answers) {
          await updateTestAnswer({
            variables: {
              input: {
                id: answer.id,
                text: answer.text,
                correct: answer.correct,
                testQuestion: { id: questionId },
              },
            },
          });
        }

        savedQuestions.push({ id: questionId });
      }

      const testGroupInput: TestGroupInput = {
        id: testId || undefined,
        testName,
        successThreshold,
        testQuestions: savedQuestions,
      };

      await updateTestGroup({
        variables: { input: testGroupInput },
      });

      onTestSaved();
    } catch (error) {
      console.error("Ошибка при сохранении теста:", error);
      setError("Ошибка при сохранении теста. Попробуйте еще раз.");
    }
  };

  return (
    <Box sx={{ maxWidth: 800 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Название теста"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Проходной балл (%)"
            type="number"
            value={successThreshold}
            onChange={(e) => setSuccessThreshold(Number(e.target.value))}
            margin="normal"
            required
            inputProps={{ min: 0, max: 100 }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Вопросы</Typography>
        <Button startIcon={<AddIcon />} onClick={addQuestion}>
          Добавить вопрос
        </Button>
      </Box>

      {questions.map((question, questionIndex) => (
        <Accordion key={questionIndex} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Typography sx={{ flexGrow: 1 }}>
                Вопрос {questionIndex + 1}: {question.text || "Новый вопрос"}
              </Typography>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  removeQuestion(questionIndex);
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Текст вопроса"
              value={question.text}
              onChange={(e) => updateQuestion(questionIndex, e.target.value)}
              margin="normal"
              multiline
              rows={2}
            />

            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Варианты ответов:
              </Typography>
            </Box>

            {question.answers.map((answer, answerIndex) => (
              <Box
                key={answerIndex}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
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
                />
                <IconButton
                  size="small"
                  onClick={() => removeAnswer(questionIndex, answerIndex)}
                  color="error"
                  disabled={question.answers.length <= 2}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => addAnswer(questionIndex)}
              sx={{ mt: 1 }}
            >
              Добавить вариант ответа
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}

      {questions.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="text.secondary" gutterBottom>
            Вопросов еще нет
          </Typography>
          <Button startIcon={<AddIcon />} onClick={addQuestion}>
            Добавить первый вопрос
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button onClick={onCancel}>Отмена</Button>
        <Button variant="contained" onClick={handleSave} disabled={savingTest}>
          {savingTest ? "Сохранение..." : "Сохранить тест"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTestForm;
