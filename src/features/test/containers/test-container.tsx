import { FC, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useTestTestGroupsByIdQuery,
  TestAnswerByQuestionDocument,
  useStartTestMutation,
  useSendTestAnswerMutation,
  useTestAttemptQuery,
} from "api/graphql/generated/graphql";

import TestView from "../views/test-view";

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

interface TestContainerProps {
  testId: string;
  trainingId: string;
  lectureId: string;
}

const TestContainer: FC<TestContainerProps> = ({
  testId,
  trainingId,
  lectureId,
}) => {
  const [searchParams] = useSearchParams();
  const attemptIdFromUrl = searchParams.get("attemptId");

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<
    TestAnswer[]
  >([]);
  const [allLoadedAnswers, setAllLoadedAnswers] = useState<TestAnswer[]>([]);
  const [answersLoading, setAnswersLoading] = useState(false);

  const [testAttemptId, setTestAttemptId] = useState<string | null>(null);
  const [testStarted, setTestStarted] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [startTest] = useStartTestMutation();
  const [sendTestAnswer] = useSendTestAnswerMutation();

  const { data: testData, loading: testLoading } = useTestTestGroupsByIdQuery({
    variables: { id: testId },
  });

  const { data: attemptData, loading: attemptLoading } = useTestAttemptQuery({
    variables: { id: attemptIdFromUrl! },
    skip: !attemptIdFromUrl,
  });

  const [getTestAnswers] = useLazyQuery(TestAnswerByQuestionDocument);

  const testQuestions =
    testData?.testTestGroupsById?.testQuestions?.filter((q) => q != null) ?? [];
  const currentQuestion = testQuestions[currentQuestionIndex];

  useEffect(() => {
    if (!testStarted && testData?.testTestGroupsById && !testLoading) {
      handleStartTest();
    }
  }, [testData, testLoading, testStarted]);

  useEffect(() => {
    if (attemptData?.testAttempt && attemptIdFromUrl) {
      const attempt = attemptData.testAttempt;

      if (attempt.id) {
        setTestAttemptId(attempt.id);
      }
      setTestStarted(true);

      setScore(attempt.successfulCount || 0);

      if (attempt.testAttemptQuestionResults) {
        const restoredAnswers: UserAnswer[] = [];
        attempt.testAttemptQuestionResults.forEach((questionResult) => {
          if (
            questionResult &&
            questionResult.testQuestion &&
            questionResult.testAnswerResults
          ) {
            const question = questionResult.testQuestion;
            questionResult.testAnswerResults.forEach((answerResult) => {
              if (
                answerResult &&
                answerResult.testAnswer &&
                answerResult.answer === true
              ) {
                if (question.id && answerResult.testAnswer.id) {
                  restoredAnswers.push({
                    questionId: question.id,
                    answerId: answerResult.testAnswer.id,
                  });
                }
              }
            });
          }
        });
        setUserAnswers(restoredAnswers);

        const answeredQuestionIds = new Set(
          restoredAnswers.map((a) => a.questionId)
        );
        const nextQuestionIndex = testQuestions.findIndex(
          (q) => q && q.id && !answeredQuestionIds.has(q.id)
        );
        if (nextQuestionIndex !== -1) {
          setCurrentQuestionIndex(nextQuestionIndex);
        }
      }
    }
  }, [attemptData, attemptIdFromUrl]);

  const handleStartTest = async () => {
    try {
      if (attemptIdFromUrl) {
        setTestAttemptId(attemptIdFromUrl);
        setTestStarted(true);
        return;
      }

      const { data } = await startTest({
        variables: {
          lectureId,
          trainingId,
        },
      });

      if (data?.startTest?.id) {
        setTestAttemptId(data.startTest.id);
        setTestStarted(true);
      }
    } catch (error: any) {
      console.error("❌ Ошибка при начале теста:", error);

      if (error.message?.includes("unfinished test")) {
        setErrorMessage(
          "⚠️ У вас есть незавершенная попытка тестирования. " +
            "Вернитесь на страницу лекции и нажмите 'Продолжить тест'."
        );
      } else {
        setErrorMessage(`❌ Ошибка при начале теста: ${error.message}`);
      }
    }
  };

  const handleSendAnswer = async (questionId: string, answerIds: string[]) => {
    if (!testAttemptId) {
      console.error("❌ Нет ID попытки теста");
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

  useEffect(() => {
    if (!currentQuestion?.id) return;

    const existingAnswers = allLoadedAnswers.filter(
      (answer) => answer.testQuestion.id === currentQuestion.id
    );

    if (existingAnswers.length > 0) {
      setCurrentQuestionAnswers(existingAnswers);
      return;
    }

    setAnswersLoading(true);
    setCurrentQuestionAnswers([]);

    const fetchCurrentAnswers = async () => {
      try {
        const { data } = await getTestAnswers({
          variables: { questionId: currentQuestion.id },
        });

        if (data?.testAnswerByQuestion) {
          const answers = data.testAnswerByQuestion
            .filter((answer: any) => answer != null)
            .map((answer: any) => ({
              id: answer.id!,
              text: answer.text!,
              correct: answer.correct!,
              testQuestion: {
                id: currentQuestion.id!,
                text: currentQuestion.text!,
              },
            }));

          setCurrentQuestionAnswers(answers);
          setAllLoadedAnswers((prev) => [...prev, ...answers]);
        }
      } catch (error) {
        console.error(
          "Error fetching answers for question:",
          currentQuestion.id,
          error
        );
      } finally {
        setAnswersLoading(false);
      }
    };

    fetchCurrentAnswers();
  }, [currentQuestion, getTestAnswers]);

  const handleAnswerSelect = (answerId: string) => {
    if (!currentQuestion?.id) return;

    const existingAnswerIndex = userAnswers.findIndex(
      (answer) => answer.questionId === currentQuestion.id
    );

    if (existingAnswerIndex >= 0) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[existingAnswerIndex] = {
        questionId: currentQuestion.id,
        answerId,
      };
      setUserAnswers(updatedAnswers);
    } else {
      setUserAnswers([
        ...userAnswers,
        { questionId: currentQuestion.id, answerId },
      ]);
    }
  };

  const handleNextQuestion = async () => {
    if (!currentQuestion?.id) return;

    const currentAnswer = userAnswers.find(
      (answer) => answer.questionId === currentQuestion.id
    );

    if (currentAnswer) {
      await handleSendAnswer(currentQuestion.id, [currentAnswer.answerId]);
    }

    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
    }
  };

  const handleFinishTest = async () => {
    if (!testAttemptId) {
      const errorMsg = "❌ Нет ID попытки теста";
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      return;
    }

    if (userAnswers.length < testQuestions.length) {
      const errorMsg = `❌ Не все вопросы отвечены: ${userAnswers.length} из ${testQuestions.length}`;
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      return;
    }

    const successThreshold =
      testData?.testTestGroupsById?.successThreshold ?? 0;
    if (score < successThreshold) {
      const errorMsg = `❌ Порог прохождения не достигнут: ${score} правильных ответов из ${successThreshold} требуемых. Тест не может быть завершен.`;
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      return;
    }

    try {
      console.log("🏁 Завершаем тест, ID попытки:", testAttemptId);
      console.log("📊 Статистика ответов:", {
        всего: testQuestions.length,
        отвечено: userAnswers.length,
        правильных: score,
        порог: successThreshold,
        достигнут: score >= successThreshold,
      });

      setIsCompleted(true);
      setSuccessMessage("✅ Тест успешно завершен!");
      setErrorMessage(null);
    } catch (error: any) {
      console.error("❌ Ошибка при завершении теста:", error);

      const errorMsg = `❌ Ошибка при завершении теста: ${
        error.message || "Неизвестная ошибка"
      }`;
      setErrorMessage(errorMsg);
    }
  };

  const currentAnswer = userAnswers.find(
    (ua) => ua.questionId === currentQuestion?.id
  );
  const isCurrentQuestionAnswered = !!currentAnswer;

  if (testLoading || answersLoading) return <AppSpinner />;
  if (!testData?.testTestGroupsById || !currentQuestion)
    return <NoDataErrorMessage />;

  const typedCurrentQuestion: TestQuestion = {
    id: currentQuestion.id!,
    text: currentQuestion.text!,
  };

  return (
    <>
      <TestView
        testData={testData.testTestGroupsById!}
        testAnswers={currentQuestionAnswers}
        userAnswers={userAnswers}
        isCompleted={isCompleted}
        score={score}
        currentQuestion={{
          id: currentQuestion?.id || "",
          text: currentQuestion?.text || "",
        }}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={testQuestions.length}
        isCurrentQuestionAnswered={isCurrentQuestionAnswered}
        trainingId={trainingId}
        lectureId={lectureId}
        testStarted={testStarted}
        onAnswerSelect={handleAnswerSelect}
        onNextQuestion={handleNextQuestion}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </>
  );
};

export default TestContainer;
