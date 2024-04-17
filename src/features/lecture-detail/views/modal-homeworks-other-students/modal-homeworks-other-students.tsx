import { FC } from "react";
import { useModal } from "react-modal-hook";
import { Dialog } from "@mui/material";

import { IModalHomeworksOtherStudents } from "./modal-homeworks-other-students.types";
import {
  StyledBox,
  StyledButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledIconBox,
  StyledStack,
} from "./modal-homeworks-other-students.styled";
import { Comments } from "../../containers";
import CommentsPagination from "../comments-pagination";
import HomeworkItem from "../homework-item";
import CommentsTotalElements from "../comment-total-elements";
import useResponsive from "../../../../shared/hooks/use-responsive";

const ModalHomeworksOtherStudents: FC<IModalHomeworksOtherStudents> = ({
  item,
  dataUserId,
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
          <HomeworkItem
            dataHomeWorkByLectureAndTraining={item}
            dataUserId={dataUserId}
          />
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
        Показать
      </StyledButton>
    </StyledStack>
  );
};

export default ModalHomeworksOtherStudents;
