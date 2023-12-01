import { FC } from "react";
import TextView from "shared/components/text-view";
import { IHomeworkContent } from "./homework-content.types";
import UpdateHomeworkItem from "../../../containers/update-homework";
import SendHomeworkItem from "../../../containers/send-homework";

const HomeworkContent: FC<IHomeworkContent> = (props) => {
  const { status, answer, openHomeWorkEdit, setOpenHomeWorkEdit, id } = props;
  let homeworkContent;

  if (status && !openHomeWorkEdit) {
    homeworkContent = <TextView content={answer} />;
  } else if (status && openHomeWorkEdit) {
    homeworkContent = (
      <UpdateHomeworkItem
        answer={answer}
        setOpenHomeWorkEdit={setOpenHomeWorkEdit}
        id={id}
      />
    );
  } else {
    homeworkContent = <SendHomeworkItem />;
  }

  return <>{homeworkContent}</>;
};

export default HomeworkContent;
