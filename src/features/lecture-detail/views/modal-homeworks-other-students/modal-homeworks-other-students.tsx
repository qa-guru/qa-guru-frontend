import { FC } from "react";
import { useModal } from "react-modal-hook";
import { Dialog } from "@mui/material";

import { IModalHomeworksOtherStudents } from "./modal-homeworks-other-students.types";
import {
  StyledBox,
  StyledButton,
  StyledClearIcon,
  StyledDialogContent,
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
      onClose={hideModalAndUpdateUrl}
      fullScreen={isMobile}
      fullWidth
      maxWidth="xl"
    >
      <StyledDialogContent id="scroll-container">
        <StyledClearIcon onClick={hideModalAndUpdateUrl} />
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

  const showModalAndSetUrl = () => {
    showModal();
  };

  const hideModalAndUpdateUrl = () => {
    hideModal();
  };

  return (
    <StyledStack>
      <Comments homeworkId={item?.id}>
        <CommentsTotalElements />
      </Comments>
      <StyledButton variant="contained" onClick={showModalAndSetUrl}>
        Показать
      </StyledButton>
    </StyledStack>
  );
};

export default ModalHomeworksOtherStudents;
