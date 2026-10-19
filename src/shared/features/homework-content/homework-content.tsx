import { FC } from "react";

import { TextView } from "shared/components/text-editor";
import UpdateHomeworkItem from "shared/features/update-homework/container";
import CreateHomeworkItem from "shared/features/send-homework/container";
import { isHomeworkStudentEditable } from "shared/helpers";

import { IHomeworkContent } from "./homework-content.types";

const HomeworkContent: FC<IHomeworkContent> = (props) => {
  const {
    status,
    answer,
    openHomeWorkEdit,
    setOpenHomeWorkEdit,
    homeWorkId,
    files,
    testGroup,
    trainingId,
    lectureId,
  } = props;
  let homeworkContent;

  if (status && (!openHomeWorkEdit || !isHomeworkStudentEditable(status))) {
    homeworkContent = <TextView content={answer} />;
  } else if (isHomeworkStudentEditable(status)) {
    homeworkContent = (
      <UpdateHomeworkItem
        answer={answer}
        setOpenHomeWorkEdit={setOpenHomeWorkEdit}
        homeWorkId={homeWorkId}
        existingFiles={files}
        resubmit
        submitLabel={
          status === "NOT_APPROVED" || status === "REVIEW"
            ? "Отправить повторно"
            : "Отправить"
        }
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
