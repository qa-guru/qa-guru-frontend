import { FC } from "react";
import { useModal } from "react-modal-hook";
import { Box, Button, Dialog } from "@mui/material";
import { IModalHomeworksOtherStudents } from "./modal-homeworks-other-students.types";
import {
  StyledBox,
  StyledClearIcon,
  StyledDialogContent,
  StyledStack,
} from "./modal-homeworks-other-students.styled";
import Comments from "../../containers/comments";
import CommentsPagination from "../comments-pagination/comments-pagination";
import HomeworkItem from "../homework-item";
import CommentsTotalElements from "../comment-total-elements";

const ModalHomeworksOtherStudents: FC<IModalHomeworksOtherStudents> = ({
  item,
  dataUserId,
}) => {
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModalAndUpdateUrl} maxWidth="xl" fullWidth>
      <StyledDialogContent id="scroll-container">
        <StyledClearIcon onClick={hideModalAndUpdateUrl} />
        <StyledBox>
          <HomeworkItem dataHomeWorkByLecture={item} dataUserId={dataUserId} />
          <Comments id={item?.id}>
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
      <Comments id={item?.id}>
        <CommentsTotalElements />
      </Comments>
      <Box>
        <Button variant="contained" onClick={showModalAndSetUrl}>
          Показать
        </Button>
      </Box>
    </StyledStack>
  );
};

export default ModalHomeworksOtherStudents;
