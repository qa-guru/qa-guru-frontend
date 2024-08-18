import { FC } from "react";
import { useModal } from "react-modal-hook";
import { Dialog } from "@mui/material";

import { useResponsive } from "shared/hooks";
import CommentsPagination from "shared/features/comments-pagination";
import HomeworkItem from "shared/features/homework-item";
import CommentsTotalElements from "shared/components/comment-total-elements";
import Comments from "shared/features/comments";

import { IModalHomeworksOtherStudents } from "./modal-homeworks-other-students.types";
import {
  StyledBox,
  StyledButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledIconBox,
  StyledStack,
} from "./modal-homeworks-other-students.styled";

const ModalHomeworksOtherStudents: FC<IModalHomeworksOtherStudents> = ({
  item,
}) => {
  const { isMobile } = useResponsive();

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog
      open={open}
      onClose={handleHideModal}
      fullScreen={isMobile}
      fullWidth
      maxWidth="xl"
    >
      <StyledDialogContent id="scroll-container">
        <StyledIconBox>
          <StyledClearIcon onClick={handleHideModal} />
        </StyledIconBox>
        <StyledBox>
          <HomeworkItem dataHomeWorkByLectureAndTraining={item} />
          <Comments homeworkId={item?.id}>
            <CommentsPagination />
          </Comments>
        </StyledBox>
      </StyledDialogContent>
    </Dialog>
  ));

  const handleShowModal = () => {
    showModal();
  };

  const handleHideModal = () => {
    hideModal();
  };

  return (
    <StyledStack>
      <Comments homeworkId={item?.id}>
        <CommentsTotalElements />
      </Comments>
      <StyledButton variant="contained" onClick={handleShowModal}>
        Открыть
      </StyledButton>
    </StyledStack>
  );
};

export default ModalHomeworksOtherStudents;
