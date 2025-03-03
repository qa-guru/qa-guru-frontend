import { FC } from "react";

import { TextView } from "shared/components/text-editor";
import UpdateHomeworkItem from "shared/features/update-homework/container";
import CreateHomeworkItem from "shared/features/send-homework/container";

import { IHomeworkContent } from "./homework-content.types";

const HomeworkContent: FC<IHomeworkContent> = (props) => {
  const { status, answer, openHomeWorkEdit, setOpenHomeWorkEdit, homeWorkId } =
    props;
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
    homeworkContent = <CreateHomeworkItem />;
  }

  return <>{homeworkContent}</>;
};

export default HomeworkContent;
