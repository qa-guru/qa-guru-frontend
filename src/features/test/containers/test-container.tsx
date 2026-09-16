import { FC, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, Box } from "@mui/material";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useStartTestMutation,
  useSendTestAnswerMutation,
  useTestAttemptQuery,
  useTestAttemptQuestionsQuery,
} from "api/graphql/generated/graphql";
import LectureGate from "features/lecture-detail/views/lecture-gate";

import TestView from "../views/test-view";
import { UserAnswer } from "../types";
import {
  isGraphqlAccessDenied,
  studentSelectedAnswers,
  studentTestQuestions,
} from "../student-test";

interface TestContainerProps {
  testId: string;
  trainingId: string;
  lectureId: string;
}

function startAttemptFailure(error: unknown): {
  denied: boolean;
  message: string | null;
} {
  if (isGraphqlAccessDenied(error as { message?: string })) {
    return { denied: true, message: null };
  }

  const message =
    error instanceof Error ? error.message : String(error ?? "");

  if (message.includes("unfinished test")) {
    return {
      denied: false,
      message:
        "⚠️ У вас есть незавершенная попытка тестирования. " +
        "Вернитесь на страницу лекции и нажмите 'Продолжить тест'.",
    };
  }

  return {
    denied: false,
    message: `❌ Ошибка при начале теста: ${message}`,
  };
}

const TestContainer: FC<TestContainerProps> = ({
  trainingId,
  lectureId,
}) => {
  const [searchParams] = useSearchParams();
  const attemptIdFromUrl = searchParams.get("attemptId");

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [answersRestored, setAnswersRestored] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testAttemptId, setTestAttemptId] = useState<string | null>(
    attemptIdFromUrl
  );
  const [denied, setDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const startRequested = useRef(Boolean(attemptIdFromUrl));

  const [startTest, { loading: startLoading }] = useStartTestMutation();
  const [sendTestAnswer] = useSendTestAnswerMutation();

  const {
    data: attemptData,
    loading: attemptLoading,
    error: attemptError,
  } = useTestAttemptQuery({
    variables: { id: testAttemptId! },
    skip: !testAttemptId,
  });

  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useTestAttemptQuestionsQuery({
    variables: { attemptId: testAttemptId! },
    skip: !testAttemptId,
  });

  useEffect(() => {
    let cancelled = false;

    if (!testAttemptId && !denied && !startRequested.current) {
      startRequested.current = true;

      startTest({
        variables: {
          lectureId,
          trainingId,
        },
      })
        .then(({ data }) => {
          if (!cancelled && data?.startTest?.id) {
            setTestAttemptId(data.startTest.id);
          }
        })
        .catch((error: unknown) => {
          if (cancelled) {
            return;
          }

          const failure = startAttemptFailure(error);

          if (failure.denied) {
            setDenied(true);
            return;
          }

          setErrorMessage(failure.message);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [denied, lectureId, startTest, testAttemptId, trainingId]);

  useEffect(() => {
    if (answersRestored || (!questionsData && !attemptData)) {
      return;
    }

    const restored = studentSelectedAnswers(
      questionsData?.testAttemptQuestions
    );
    const questions = studentTestQuestions({
      attemptQuestions: questionsData?.testAttemptQuestions,
      testGroupQuestions: attemptData?.testAttempt?.testGroup?.testQuestions,
    });

    if (restored.length) {
      setUserAnswers(restored);
      const answeredQuestionIds = new Set(
        restored.map((answer) => answer.questionId)
      );
      const nextQuestionIndex = questions.findIndex(
        (question) => !answeredQuestionIds.has(question.id)
      );

      if (nextQuestionIndex !== -1) {
        setCurrentQuestionIndex(nextQuestionIndex);
      }
    }

    const attempt = attemptData?.testAttempt;

    if (attempt) {
      setScore(attempt.successfulCount || 0);

      if (attempt.result !== null && attempt.result !== undefined) {
        setIsCompleted(true);
      }
    }

    setAnswersRestored(true);
  }, [answersRestored, attemptData, questionsData]);

  const handleSendAnswer = async (questionId: string, answerIds: string[]) => {
    if (!testAttemptId) {
      return;
    }

    try {
      const { data } = await sendTestAnswer({
        variables: {
          questionId,
          attemptId: testAttemptId,
          testAnswerIds: answerIds,
        },
      });

      if (data?.sendTestAnswer) {
        const attempt = data.sendTestAnswer;
        setScore(attempt.successfulCount || 0);

        if (attempt.result !== null) {
          setIsCompleted(true);

          if (attempt.result === true) {
            setSuccessMessage("✅ Тест успешно завершен!");
          } else {
            setErrorMessage(
              "❌ Тест не пройден - недостаточно правильных ответов"
            );
          }
        }
      }
    } catch (error) {
      console.error("❌ Ошибка при отправке ответа:", error);
    }
  };

  const questions = studentTestQuestions({
    attemptQuestions: questionsData?.testAttemptQuestions,
    testGroupQuestions: attemptData?.testAttempt?.testGroup?.testQuestions,
  });
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerId: string, isSelected: boolean) => {
    if (!currentQuestion?.id) {
      return;
    }

    const existingAnswerIndex = userAnswers.findIndex(
      (answer) => answer.questionId === currentQuestion.id
    );

    if (existingAnswerIndex >= 0) {
      const updatedAnswers = [...userAnswers];
      const currentAnswerIds = updatedAnswers[existingAnswerIndex].answerIds;

      if (isSelected) {
        if (!currentAnswerIds.includes(answerId)) {
          updatedAnswers[existingAnswerIndex] = {
            questionId: currentQuestion.id,
            answerIds: [...currentAnswerIds, answerId],
          };
        }
      } else {
        updatedAnswers[existingAnswerIndex] = {
          questionId: currentQuestion.id,
          answerIds: currentAnswerIds.filter((id) => id !== answerId),
        };
      }

      setUserAnswers(updatedAnswers);
    } else if (isSelected) {
      setUserAnswers([
        ...userAnswers,
        { questionId: currentQuestion.id, answerIds: [answerId] },
      ]);
    }
  };

  const handleNextQuestion = async () => {
    if (!currentQuestion?.id) {
      return;
    }

    const currentAnswer = userAnswers.find(
      (answer) => answer.questionId === currentQuestion.id
    );

    if (currentAnswer && currentAnswer.answerIds.length > 0) {
      await handleSendAnswer(currentQuestion.id, currentAnswer.answerIds);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const currentAnswer = userAnswers.find(
    (userAnswer) => userAnswer.questionId === currentQuestion?.id
  );
  const isCurrentQuestionAnswered =
    !!currentAnswer && currentAnswer.answerIds.length > 0;
  const accessDenied =
    denied ||
    isGraphqlAccessDenied(attemptError) ||
    isGraphqlAccessDenied(questionsError);

  if (accessDenied) {
    return <LectureGate lectureMissing />;
  }

  if (startLoading || attemptLoading || questionsLoading) {
    return <AppSpinner />;
  }

  if (errorMessage && !testAttemptId) {
    return (
      <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
        <Alert severity="error">{errorMessage}</Alert>
      </Box>
    );
  }

  if (!currentQuestion) {
    return <NoDataErrorMessage />;
  }

  const testGroup = attemptData?.testAttempt?.testGroup;
  const currentQuestionAnswers = currentQuestion.answers.map((answer) => ({
    id: answer.id,
    text: answer.text,
    testQuestion: {
      id: currentQuestion.id,
      text: currentQuestion.text,
    },
  }));

  return (
    <TestView
      testData={{
        testName: testGroup?.testName ?? "",
        successThreshold: testGroup?.successThreshold ?? 0,
      }}
      testAnswers={currentQuestionAnswers}
      userAnswers={userAnswers}
      isCompleted={isCompleted}
      score={score}
      currentQuestion={{
        id: currentQuestion.id,
        text: currentQuestion.text,
      }}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      isCurrentQuestionAnswered={isCurrentQuestionAnswered}
      trainingId={trainingId}
      lectureId={lectureId}
      testStarted={Boolean(testAttemptId)}
      onAnswerSelect={handleAnswerSelect}
      onNextQuestion={handleNextQuestion}
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
};

export default TestContainer;
