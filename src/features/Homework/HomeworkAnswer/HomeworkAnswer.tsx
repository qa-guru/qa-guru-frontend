import React from "react";
import { IHomeworkAnswer } from "./HomeworkAnswer.types";
import TextSerialization from "../../../shared/TextSerialization";

const HomeworkAnswer: React.FC<IHomeworkAnswer> = ({ data }) => {
  const { answer } = data.homeWorkByStudentAndLecture!;

  return <TextSerialization text={answer!} />;
};

export default HomeworkAnswer;
