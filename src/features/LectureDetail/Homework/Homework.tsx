import React, { useContext } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogContent, Paper } from "@mui/material";
import { IHomework } from "./Homework.types";
import CommentContainer from "../Comment";
import { red } from "../../../theme/colors";
import { HomeworkItem } from "../HomeworkItem";
import CommentLimited from "../CommentLimited";
import Comment from "../Comment/Comment";
import { LectureIdContext } from "../../../context/LectureIdContext";

const RedHighlightOffIcon = styled(HighlightOffIcon)({
  color: red.main,
});

const style = {
  buttonUpdate: { textTransform: "none", minWidth: "147px", mt: "15px" },
  paper: { padding: { xs: "15px", md: "20px" }, mt: "40px" },
  scrollContainer: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
  button: { mt: "10px" },
};

const Homework: React.FC<IHomework> = (props) => {
  const { dataHomeWorkByLecture, dataUserId } = props;
  const lectureId = useContext(LectureIdContext);

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xl" fullWidth>
      <DialogContent sx={style.scrollContainer} id="scroll-container">
        <LectureIdContext.Provider value={lectureId}>
          <HomeworkItem
            dataHomeWorkByLecture={dataHomeWorkByLecture}
            dataUserId={dataUserId.user?.id!}
          />
          <CommentContainer id={dataHomeWorkByLecture?.id!}>
            <Comment />
          </CommentContainer>
        </LectureIdContext.Provider>
      </DialogContent>
    </Dialog>
  ));

  return (
    <Paper sx={style.paper}>
      <HomeworkItem
        dataHomeWorkByLecture={dataHomeWorkByLecture}
        dataUserId={dataUserId.user?.id!}
      />
      <>
        {dataHomeWorkByLecture?.id! && (
          <CommentContainer id={dataHomeWorkByLecture?.id!}>
            <CommentLimited />
          </CommentContainer>
        )}
      </>
      {dataHomeWorkByLecture?.id! && (
        <Button sx={style.button} variant="contained" onClick={showModal}>
          Показать другие комментарии
        </Button>
      )}
    </Paper>
  );
};

export default Homework;
