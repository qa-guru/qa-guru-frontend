import { FC } from "react";
import { useParams } from "react-router-dom";

import TestContainer from "features/test/containers/test-container";

const TestPage: FC = () => {
  const { testId, trainingId, lectureId } = useParams<{
    testId: string;
    trainingId: string;
    lectureId: string;
  }>();

  // Проверяем, что все параметры присутствуют
  if (!testId || !trainingId || !lectureId) {
    return <div>Ошибка: отсутствуют необходимые параметры</div>;
  }

  return (
    <TestContainer
      testId={testId}
      trainingId={trainingId}
      lectureId={lectureId}
    />
  );
};

export default TestPage;
