import React, { useContext } from "react";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogContent, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { IHomework } from "./Homework.types";
import Comments from "../../containers/Comments";
import CommentsLimited from "../CommentsLimited";
import CommentsPagination from "../CommentsPagination";
import { LectureIdContext } from "../../context/LectureIdContext";
import HomeworkItem from "../HomeworkItem";

const style = {
  paper: { padding: { xs: "15px", md: "20px" }, mt: "40px" },
  scrollContainer: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
  button: { mt: "10px" },
  clearIcon: {
    position: "absolute",
    top: "20px",
    right: "23px",
    cursor: "pointer",
    zIndex: "1"
  },
};

const Homework: React.FC<IHomework> = (props) => {
  const { dataHomeWorkByLecture, dataUserId } = props;
  const lectureId = useContext(LectureIdContext);

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} maxWidth="xl" fullWidth>
      <DialogContent sx={style.scrollContainer} id="scroll-container">
        <ClearIcon sx={style.clearIcon} onClick={hideModal} />
        <LectureIdContext.Provider value={lectureId}>
          <HomeworkItem
            dataHomeWorkByLecture={dataHomeWorkByLecture}
            dataUserId={dataUserId}
          />
          <Comments id={dataHomeWorkByLecture?.id!}>
            <CommentsPagination />
          </Comments>
        </LectureIdContext.Provider>
      </DialogContent>
    </Dialog>
  ));

  return (
    <Paper sx={style.paper}>
      <HomeworkItem
        dataHomeWorkByLecture={dataHomeWorkByLecture}
        dataUserId={dataUserId}
      />
      {dataHomeWorkByLecture?.id! && (
        <>
          <Comments id={dataHomeWorkByLecture?.id!}>
            <CommentsLimited />
          </Comments>
          <Button sx={style.button} variant="contained" onClick={showModal}>
            Показать другие комментарии
          </Button>
        </>
      )}
    </Paper>
  );
};

export default Homework;
