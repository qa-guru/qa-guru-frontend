import { FC } from "react";

import { LectureDetail, Stepper } from "../../containers";

const LectureBox: FC = () => {
  return (
    <>
      <Stepper />
      <LectureDetail />
    </>
  );
};

export default LectureBox;
