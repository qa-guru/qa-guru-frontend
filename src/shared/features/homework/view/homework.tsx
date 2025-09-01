import { FC, useState } from "react";
import { useModal } from "react-modal-hook";
import { Dialog, Box } from "@mui/material";

import { useResponsive } from "shared/hooks";
import Comments from "shared/features/comments";
import CommentsLimited from "shared/features/comments-limited";
import CommentsPagination from "shared/features/comments-pagination";
import HomeworkItem from "shared/features/homework-item";
import { MIN_COMMENTS_TO_SHOW_BUTTON } from "shared/constants";

import {
  StyledButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledModalBox,
  StyledPaper,
  StyledIconBox,
} from "./homework.styled";
import { IHomework } from "./homework.types";

const Homework: FC<IHomework> = (props) => {
  const {
    dataHomeWorkByLectureAndTraining,
    hideMentorAndStudent,
    testGroup,
    trainingId,
    lectureId,
  } = props;
  const { isMobile } = useResponsive();

  const [totalElements, setTotalElements] = useState<number>(0);

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog
      open={open}
      onClose={hideModalAndUpdateUrl}
      fullScreen={isMobile}
      maxWidth="xl"
      fullWidth
    >
      <StyledDialogContent id="scroll-container">
        <StyledIconBox>
          <StyledClearIcon onClick={hideModalAndUpdateUrl} />
        </StyledIconBox>
        <StyledModalBox>
          <HomeworkItem
            dataHomeWorkByLectureAndTraining={dataHomeWorkByLectureAndTraining}
            testGroup={testGroup}
            trainingId={trainingId}
            lectureId={lectureId}
          />
          <Comments homeworkId={dataHomeWorkByLectureAndTraining?.id}>
            <CommentsPagination />
          </Comments>
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
        dataHomeWorkByLectureAndTraining={dataHomeWorkByLectureAndTraining}
        hideMentorAndStudent={hideMentorAndStudent}
        testGroup={testGroup}
        trainingId={trainingId}
        lectureId={lectureId}
      />
      {dataHomeWorkByLectureAndTraining?.id && (
        <>
          <Comments homeworkId={dataHomeWorkByLectureAndTraining?.id}>
            <CommentsLimited setTotalElements={setTotalElements} />
          </Comments>

          {totalElements > MIN_COMMENTS_TO_SHOW_BUTTON && (
            <Box>
              <StyledButton variant="contained" onClick={showModalAndSetUrl}>
                Показать другие комментарии
              </StyledButton>
            </Box>
          )}
        </>
      )}
    </StyledPaper>
  );
};

export default Homework;
