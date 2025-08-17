import { FC, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useTestTestGroupsByIdQuery,
  TestAnswerByQuestionDocument,
  useStartTestMutation,
  useSendTestAnswerMutation,
  useSendTestAnswerToReviewMutation,
} from "api/graphql/generated/graphql";

import TestView from "../views/test-view";

// Типы для теста (пока без GraphQL, потом можно заменить на сгенерированные)
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
  // Отладочная информация
  console.log("🔍 TestContainer Debug Info:", {
    testId,
    trainingId,
    lectureId,
  });

  // Состояние теста
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<
    TestAnswer[]
  >([]);
  const [allLoadedAnswers, setAllLoadedAnswers] = useState<TestAnswer[]>([]);
  const [answersLoading, setAnswersLoading] = useState(false);

  // Состояние попытки тестирования
  const [testAttemptId, setTestAttemptId] = useState<string | null>(null);
  const [testStarted, setTestStarted] = useState(false);

  // GraphQL мутации
  const [startTest] = useStartTestMutation();
  const [sendTestAnswer] = useSendTestAnswerMutation();
  const [sendTestAnswerToReview] = useSendTestAnswerToReviewMutation();

  // Получаем детали тестовой группы
  const { data: testData, loading: testLoading } = useTestTestGroupsByIdQuery({
    variables: { id: testId },
  });

  const [getTestAnswers] = useLazyQuery(TestAnswerByQuestionDocument);

  // Получаем список вопросов
  const testQuestions =
    testData?.testTestGroupsById?.testQuestions?.filter((q) => q != null) ?? [];
  const currentQuestion = testQuestions[currentQuestionIndex];

  // Начинаем тест при загрузке
  useEffect(() => {
    if (!testStarted && testData?.testTestGroupsById && !testLoading) {
      handleStartTest();
    }
  }, [testData, testLoading, testStarted]);

  // Обработчик начала теста
  const handleStartTest = async () => {
    try {
      console.log("🚀 Начинаем тест для:", { lectureId, trainingId });

      const { data } = await startTest({
        variables: {
          lectureId,
          trainingId,
        },
      });

      if (data?.startTest?.id) {
        setTestAttemptId(data.startTest.id);
        setTestStarted(true);
        console.log("✅ Тест начат, ID попытки:", data.startTest.id);
      }
    } catch (error) {
      console.error("❌ Ошибка при начале теста:", error);
    }
  };

  // Обработчик отправки ответа
  const handleSendAnswer = async (questionId: string, answerIds: string[]) => {
    if (!testAttemptId) {
      console.error("❌ Нет ID попытки теста");
      return;
    }

    try {
      console.log("📝 Отправляем ответ:", {
        questionId,
        answerIds,
        testAttemptId,
      });

      const { data } = await sendTestAnswer({
        variables: {
          questionId,
          attemptId: testAttemptId,
          testAnswerIds: answerIds,
        },
      });

      if (data?.sendTestAnswer) {
        // Обновляем состояние на основе ответа сервера
        const attempt = data.sendTestAnswer;
        setScore(attempt.successfulCount || 0);

        // Если тест завершен
        if (attempt.result !== null) {
          setIsCompleted(true);
          console.log("🏁 Тест завершен, результат:", attempt.result);
        }

        console.log(
          "✅ Ответ отправлен, обновленный счет:",
          attempt.successfulCount
        );
      }
    } catch (error) {
      console.error("❌ Ошибка при отправке ответа:", error);
    }
  };

  // Обработчик завершения теста
  const handleFinishTest = async () => {
    if (!testAttemptId) {
      console.error("❌ Нет ID попытки теста");
      return;
    }

    try {
      console.log("🏁 Завершаем тест, ID попытки:", testAttemptId);

      const { data } = await sendTestAnswerToReview({
        variables: {
          attemptId: testAttemptId,
        },
      });

      if (data?.sendTestAnswerToReview) {
        console.log(
          "✅ Тест отправлен на проверку:",
          data.sendTestAnswerToReview
        );
        // Можно показать уведомление об успешной отправке
      }
    } catch (error) {
      console.error("❌ Ошибка при завершении теста:", error);
    }
  };

  // Загружаем ответы для текущего вопроса
  useEffect(() => {
    if (!currentQuestion?.id) return;

    // Проверяем, есть ли уже загруженные ответы для этого вопроса
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
          // Сохраняем все ответы для финальной проверки
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

  // Обработчик выбора ответа
  const handleAnswerSelect = (answerId: string) => {
    if (!currentQuestion?.id) return;

    const existingAnswerIndex = userAnswers.findIndex(
      (answer) => answer.questionId === currentQuestion.id
    );

    if (existingAnswerIndex >= 0) {
      // Обновляем существующий ответ
      const updatedAnswers = [...userAnswers];
      updatedAnswers[existingAnswerIndex] = {
        questionId: currentQuestion.id,
        answerId,
      };
      setUserAnswers(updatedAnswers);
    } else {
      // Добавляем новый ответ
      setUserAnswers([
        ...userAnswers,
        { questionId: currentQuestion.id, answerId },
      ]);
    }
  };

  // Обработчик перехода к следующему вопросу
  const handleNextQuestion = async () => {
    if (!currentQuestion?.id) return;

    // Отправляем ответ на текущий вопрос
    const currentAnswer = userAnswers.find(
      (answer) => answer.questionId === currentQuestion.id
    );

    if (currentAnswer) {
      await handleSendAnswer(currentQuestion.id, [currentAnswer.answerId]);
    }

    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Завершаем тест
      await handleFinishTest();
    }
  };

  // Проверяем, ответил ли пользователь на текущий вопрос
  const currentAnswer = userAnswers.find(
    (ua) => ua.questionId === currentQuestion?.id
  );
  const isCurrentQuestionAnswered = !!currentAnswer;

  if (testLoading || answersLoading) return <AppSpinner />;
  if (!testData?.testTestGroupsById || !currentQuestion)
    return <NoDataErrorMessage />;

  // Приводим currentQuestion к правильному типу
  const typedCurrentQuestion: TestQuestion = {
    id: currentQuestion.id!,
    text: currentQuestion.text!,
  };

  return (
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
      onSubmitTest={handleFinishTest}
    />
  );
};

export default TestContainer;
