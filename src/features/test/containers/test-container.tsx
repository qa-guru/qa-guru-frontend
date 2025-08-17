import { FC, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useTestTestGroupsByIdQuery,
  TestAnswerByQuestionDocument,
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

  // Убираем захардкоженный testId
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<
    TestAnswer[]
  >([]);
  const [allLoadedAnswers, setAllLoadedAnswers] = useState<TestAnswer[]>([]);
  const [answersLoading, setAnswersLoading] = useState(false);

  // Получаем детали тестовой группы
  const { data: testData, loading: testLoading } = useTestTestGroupsByIdQuery({
    variables: { id: testId },
  });

  const [getTestAnswers] = useLazyQuery(TestAnswerByQuestionDocument);

  // Получаем список вопросов
  const testQuestions =
    testData?.testTestGroupsById?.testQuestions?.filter((q) => q != null) ?? [];
  const currentQuestion = testQuestions[currentQuestionIndex];

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

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setUserAnswers((prev) => {
      const filtered = prev.filter((ua) => ua.questionId !== questionId);
      return [...filtered, { questionId, answerId }];
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Завершаем тест
      handleSubmitTest();
    }
  };

  const handleSubmitTest = () => {
    let correctAnswers = 0;

    userAnswers.forEach((userAnswer) => {
      const answer = allLoadedAnswers.find(
        (ta) => ta.id === userAnswer.answerId
      );
      if (answer?.correct) {
        correctAnswers++;
      }
    });

    const scorePercentage = (correctAnswers / testQuestions.length) * 100;

    console.log("🔍 Test Result Debug:", {
      correctAnswers,
      totalQuestions: testQuestions.length,
      scorePercentage: scorePercentage.toFixed(1) + "%",
      userAnswers: userAnswers.length,
      allLoadedAnswers: allLoadedAnswers.length,
    });

    setScore(correctAnswers);
    setIsCompleted(true);
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
      testData={testData.testTestGroupsById}
      testAnswers={currentQuestionAnswers}
      userAnswers={userAnswers}
      isCompleted={isCompleted}
      score={score}
      currentQuestion={typedCurrentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={testQuestions.length}
      isCurrentQuestionAnswered={isCurrentQuestionAnswered}
      trainingId={trainingId}
      lectureId={lectureId}
      onAnswerSelect={handleAnswerSelect}
      onNextQuestion={handleNextQuestion}
      onSubmitTest={handleSubmitTest}
    />
  );
};

export default TestContainer;
