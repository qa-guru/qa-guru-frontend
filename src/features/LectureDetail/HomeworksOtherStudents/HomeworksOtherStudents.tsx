import React from "react";
import { IHomeworksOtherStudents } from "./HomeworksOtherStudents.types";
import Homework from "../Homework";

const HomeworksOtherStudents: React.FC<IHomeworksOtherStudents> = ({
  data,
}) => {
  const { items } = data.homeWorksByLectureId!;

  return (
    <>
      {items?.map((item, index) => {
        return console.log(item);
      })}
    </>
  );
};

export default HomeworksOtherStudents;
