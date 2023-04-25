import React from "react";
import { IHomeworkContent } from "./HomeworkContent.types";
import TextSerialization from "../../../../../shared/Serializers/TextSerialization";
import UpdateHomeworkItem from "../../../containers/UpdateHomework";
import SendHomeworkItem from "../../../containers/SendHomework";

const HomeworkContent: React.FC<IHomeworkContent> = (props) => {
  const { status, answer, openHomeWorkEdit, setOpenHomeWorkEdit, id } = props;

  if (status && !openHomeWorkEdit) {
    return <TextSerialization text={answer!} />;
  } else if (status && openHomeWorkEdit) {
    return (
      <UpdateHomeworkItem
        answer={answer}
        setOpenHomeWorkEdit={setOpenHomeWorkEdit}
        id={id}
      />
    );
  } else {
    return <SendHomeworkItem />;
  }
};

export default HomeworkContent;
