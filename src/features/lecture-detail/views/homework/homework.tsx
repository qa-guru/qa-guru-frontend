import { FC } from "react";
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
import useResponsive from "../../../../shared/hooks/use-responsive";

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
        <StyledClearIcon onClick={hideModalAndUpdateUrl} />
        <StyledModalBox>
          <HomeworkItem
            dataHomeWorkByLectureAndTraining={dataHomeWorkByLectureAndTraining}
            dataUserId={dataUserId}
          />
          <Comments id={dataHomeWorkByLectureAndTraining?.id}>
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
          <Comments id={dataHomeWorkByLectureAndTraining?.id}>
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
