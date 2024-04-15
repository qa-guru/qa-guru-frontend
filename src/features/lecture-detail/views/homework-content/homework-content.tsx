import { FC } from "react";
import { TextView } from "shared/components/text-editor";

import { IHomeworkContent } from "./homework-content.types";
import { UpdateHomeworkItem, SendHomeworkItem } from "../../containers";

const HomeworkContent: FC<IHomeworkContent> = (props) => {
  const { status, answer, openHomeWorkEdit, setOpenHomeWorkEdit, id } = props;
  let homeworkContent;

  if (status && !openHomeWorkEdit) {
    homeworkContent = <TextView content={answer} />;
  } else if (status && openHomeWorkEdit) {
    homeworkContent = (
      <UpdateHomeworkItem {...{ answer, setOpenHomeWorkEdit, id }} />
    );
  } else {
    homeworkContent = <SendHomeworkItem />;
  }

  return <>{homeworkContent}</>;
};

export default HomeworkContent;
