import { FC } from "react";
import { useParams } from "react-router-dom";

import { CreateTestContainer } from "features/admin-panel/tests-admin/containers";

const CreateTestPage: FC = () => {
  const { testId } = useParams<{ testId?: string }>();

  return <CreateTestContainer testId={testId} />;
};

export default CreateTestPage;
