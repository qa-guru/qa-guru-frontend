import { FC } from "react";

import { Trainings, CreateTraining } from "../../containers";

const CoursesAdmin: FC = () => {
  return (
    <>
      <CreateTraining />
      <Trainings />
    </>
  );
};

export default CoursesAdmin;
