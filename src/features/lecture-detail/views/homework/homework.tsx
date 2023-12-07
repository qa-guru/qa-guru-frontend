import { FC, useContext } from "react";
import { useModal } from "react-modal-hook";
import { Dialog, Box } from "@mui/material";

import { IHomework } from "./homework.types";
import {
  StyledButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledModalBox,
  StyledPaper,
} from "./homework.styled";
import HomeworkItem from "../homework-item";
import { Comments } from "../../containers";
import CommentsLimited from "../comments-limited";
import CommentsPagination from "../comments-pagination";
import { LectureIdContext } from "../../context/lecture-id-context";

const Homework: FC<IHomework> = (props) => {
  const { dataHomeWorkByLecture, dataUserId, hideMentorAndStudent } = props;
  const lectureId = useContext(LectureIdContext);

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModalAndUpdateUrl} maxWidth="xl" fullWidth>
      <StyledDialogContent id="scroll-container">
        <StyledClearIcon onClick={hideModalAndUpdateUrl} />
        <StyledModalBox>
          <LectureIdContext.Provider value={lectureId}>
            <HomeworkItem
              dataHomeWorkByLecture={dataHomeWorkByLecture}
              dataUserId={dataUserId}
            />
            <Comments id={dataHomeWorkByLecture?.id}>
              <CommentsPagination />
            </Comments>
          </LectureIdContext.Provider>
        </StyledModalBox>
      </StyledDialogContent>
    </Dialog>
  ));

  const showModalAndSetUrl = () => {
    showModal();
  };

  const hideModalAndUpdateUrl = () => {
    hideModal();
  };

  return (
    <StyledPaper>
      <HomeworkItem
        dataHomeWorkByLecture={dataHomeWorkByLecture}
        dataUserId={dataUserId}
        hideMentorAndStudent={hideMentorAndStudent}
      />
      {dataHomeWorkByLecture?.id && (
        <>
          <Comments id={dataHomeWorkByLecture?.id}>
            <CommentsLimited />
          </Comments>
          <Box>
            <StyledButton variant="contained" onClick={showModalAndSetUrl}>
              Показать другие комментарии
            </StyledButton>
          </Box>
        </>
      )}
    </StyledPaper>
  );
};

export default Homework;
