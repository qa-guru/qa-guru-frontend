import { FC } from "react";

import { TextView } from "shared/components/text-editor";
import UpdateHomeworkItem from "shared/features/update-homework/container";
import CreateHomeworkItem from "shared/features/send-homework/container";

import { IHomeworkContent } from "./homework-content.types";

const HomeworkContent: FC<IHomeworkContent> = (props) => {
  const {
    status,
    answer,
    openHomeWorkEdit,
    setOpenHomeWorkEdit,
    homeWorkId,
    testGroup,
    trainingId,
    lectureId,
  } = props;
  let homeworkContent;

  if (status && !openHomeWorkEdit) {
    homeworkContent = <TextView content={answer} />;
  } else if (status && openHomeWorkEdit) {
    homeworkContent = (
      <UpdateHomeworkItem
        answer={answer}
        setOpenHomeWorkEdit={setOpenHomeWorkEdit}
        homeWorkId={homeWorkId}
      />
    );
  } else {
    homeworkContent = (
      <CreateHomeworkItem
        testGroup={testGroup}
        trainingId={trainingId}
        lectureId={lectureId}
      />
    );
  }

  return <>{homeworkContent}</>;
};

export default HomeworkContent;
