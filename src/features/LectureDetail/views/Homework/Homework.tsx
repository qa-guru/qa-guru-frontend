import React, { useContext } from "react";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogContent, Paper, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { IHomework } from "./Homework.types";
import { style } from "./styles";
import Comments from "../../containers/Comments";
import CommentsLimited from "../CommentsLimited";
import CommentsPagination from "../CommentsPagination";
import { LectureIdContext } from "../../context/LectureIdContext";
import HomeworkItem from "../HomeworkItem";

const Homework: React.FC<IHomework> = (props) => {
  const { dataHomeWorkByLecture, dataUserId } = props;
  const lectureId = useContext(LectureIdContext);

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xl" fullWidth>
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
          <Box mt={2}>
            <Button sx={style.button} variant="contained" onClick={showModal}>
              Показать другие комментарии
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Homework;
