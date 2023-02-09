import React from "react";
import HomeworkAnswer from "../HomeworkAnswer/HomeworkAnswerContainer";
import SendHomeWorkToCheck from "../SendHomeWorkToCheck/SendHomeWorkToCheckContainer";
import { IHomeworkCheckStatus } from "./HomeworkCheckStatus.types";
import { Box } from "@mui/material";

const HomeworkCheckStatus: React.FC<IHomeworkCheckStatus> = (props) => {
  const { data } = props;

  return (
    <>
      {data?.homeWorkByStudentAndLecture?.status ? (
        <HomeworkAnswer />
      ) : (
        <SendHomeWorkToCheck />
      )}
    </>
  );
};

export default HomeworkCheckStatus;
