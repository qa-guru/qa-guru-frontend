import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

import {
  useUpdateTestGroupMutation,
  useTestTestGroupsByIdQuery,
  useUpdateTestQuestionMutation,
  useUpdateTestAnswerMutation,
  TestGroupInput,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import CreateTestForm from "../components/create-test-form";
import { QuestionForm } from "../types";

interface CreateTestContainerProps {
  testId?: string;
}

const CreateTestContainer: FC<CreateTestContainerProps> = ({ testId }) => {
  const navigate = useNavigate();
  const isEditing = Boolean(testId);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    data: existingTestData,
    loading: loadingTest,
    error: loadError,
  } = useTestTestGroupsByIdQuery({
    variables: { id: testId || "" },
    skip: !testId,
  });

  const [updateTestGroup, { loading: savingTest }] =
    useUpdateTestGroupMutation();
  const [updateTestQuestion] = useUpdateTestQuestionMutation();
  const [updateTestAnswer] = useUpdateTestAnswerMutation();

  const handleGoBack = () => {
    navigate("/tests");
  };

  const handleTestSaved = async (
    testName: string,
    successThreshold: number,
    questions: QuestionForm[]
  ) => {
    try {
      setError(null);
      setSuccess(null);

      const savedQuestions = [];

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

      const result = await updateTestGroup({
        variables: { input: testGroupInput },
      });

      const savedTestId = result.data?.updateTestGroup?.id;

      if (isEditing) {
        setSuccess("Тест успешно обновлен!");
      } else {
        setSuccess(`Тест успешно создан! ID: ${savedTestId}`);
      }

      setTimeout(() => {
        navigate("/tests");
      }, 2000);
    } catch (error: any) {
      console.error("Ошибка при сохранении теста:", error);
      setError(
        error.message || "Ошибка при сохранении теста. Попробуйте еще раз."
      );
    }
  };

  if (loadingTest) return <AppSpinner />;
  if (loadError) return <NoDataErrorMessage />;

  const existingTest = existingTestData?.testTestGroupsById;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs>
            <Link
              component="button"
              variant="body1"
              onClick={handleGoBack}
              sx={{ textDecoration: "none" }}
            >
              Управление тестами
            </Link>
            <Typography color="text.primary">
              {isEditing ? "Редактирование теста" : "Создание теста"}
            </Typography>
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            variant="outlined"
          >
            Назад
          </Button>
          <Typography variant="h4">
            {isEditing
              ? `Редактирование теста "${existingTest?.testName}"`
              : "Создание нового теста"}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <CreateTestForm
            existingTest={existingTest}
            onSave={handleTestSaved}
            onCancel={handleGoBack}
            isLoading={savingTest}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateTestContainer;
