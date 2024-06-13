import { FC } from "react";
import { useModal } from "react-modal-hook";
import { Dialog, Box } from "@mui/material";
import { useResponsive } from "shared/hooks";
import Comments from "shared/features/comments";
import CommentsLimited from "shared/features/comments-limited";
import CommentsPagination from "shared/features/comments-pagination";
import HomeworkItem from "shared/features/homework-item";

import { IHomework } from "./homework.types";
import {
  StyledButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledModalBox,
  StyledPaper,
  StyledIconBox,
} from "./homework.styled";

const Homework: FC<IHomework> = (props) => {
  const { dataHomeWorkByLectureAndTraining, dataUserId, hideMentorAndStudent } =
    props;
  const { isMobile } = useResponsive();

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
            dataUserId={dataUserId}
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
        dataUserId={dataUserId}
        hideMentorAndStudent={hideMentorAndStudent}
      />
      {dataHomeWorkByLectureAndTraining?.id && (
        <>
          <Comments homeworkId={dataHomeWorkByLectureAndTraining?.id}>
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
