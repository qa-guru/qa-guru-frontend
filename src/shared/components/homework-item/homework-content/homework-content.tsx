import { FC } from "react";
import TextSerialization from "shared/serializers/text-serialization";
import { IHomeworkContent } from "./homework-content.types";
import UpdateHomeworkItem from "../../../../features/lecture-detail/containers/update-homework";
import SendHomeworkItem from "../../../../features/lecture-detail/containers/send-homework";

const HomeworkContent: FC<IHomeworkContent> = (props) => {
  const { status, answer, openHomeWorkEdit, setOpenHomeWorkEdit, id } = props;
  let homeworkContent;

  if (status && !openHomeWorkEdit) {
    homeworkContent = <TextSerialization text={answer!} />;
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
