import React, { useState } from "react";
import HomeworkAnswer from "../Homework/HomeworkContainer";
import UpdateHomework from "../UpdateHomework/UpdateHomeworkContainer";
import SendHomeWorkToCheck from "../SendHomeWork/SendHomeWorkContainer";
import { Button, Paper } from "@mui/material";
import { IHomeworkWrapper } from "./HomeworkWrapper.types";

const style = {
  paper: { padding: "20px", mt: "40px" },
  buttonUpdate: { textTransform: "none", minWidth: "151px" },
};

const HomeworkWrapper: React.FC<IHomeworkWrapper> = ({
  dataHomeworkStatus,
}) => {
  const [openHomeWorkEdit, setOpenHomeWorkEdit] = useState<Boolean>(false);

  let homework;

  if (
    dataHomeworkStatus?.homeWorkByStudentAndLecture?.status &&
    !openHomeWorkEdit
  ) {
    homework = <HomeworkAnswer />;
  } else if (
    dataHomeworkStatus?.homeWorkByStudentAndLecture?.status &&
    openHomeWorkEdit
  ) {
    homework = <UpdateHomework setOpenHomeWorkEdit={setOpenHomeWorkEdit} />;
  } else if (
    !dataHomeworkStatus?.homeWorkByStudentAndLecture?.status &&
    !openHomeWorkEdit
  ) {
    homework = <SendHomeWorkToCheck />;
  }
  return (
    <Paper sx={style.paper}>
      {homework}
      <br />
      {!openHomeWorkEdit &&
        dataHomeworkStatus?.homeWorkByStudentAndLecture?.status && (
          <Button
            onClick={() => setOpenHomeWorkEdit(true)}
            sx={style.buttonUpdate}
            variant="contained"
          >
            Редактировать
          </Button>
        )}
    </Paper>
  );
};

export default HomeworkWrapper;
