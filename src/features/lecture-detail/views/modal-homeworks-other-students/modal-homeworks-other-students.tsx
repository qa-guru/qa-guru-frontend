import React from "react";
import { useModal } from "react-modal-hook";
import { Box, Button, Dialog } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const ModalHomeworksOtherStudents: React.FC<IModalHomeworksOtherStudents> = ({
  item,
  dataUserId,
}) => {
  const { modalId } = useParams<{ modalId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModalAndUpdateUrl} maxWidth="xl" fullWidth>
      <StyledDialogContent id="scroll-container">
        <StyledClearIcon onClick={hideModalAndUpdateUrl} />
        <StyledBox>
          <HomeworkItem dataHomeWorkByLecture={item} dataUserId={dataUserId} />
          <Comments id={item.id!}>
            <CommentsPagination />
          </Comments>
        </StyledBox>
      </StyledDialogContent>
    </Dialog>
  ));

  // useEffect(() => {
  //   if (modalId === item.id) {
  //     showModal();
  //   }
  // }, [modalId, showModal, item.id]);

  const showModalAndSetUrl = () => {
    showModal();
    // navigate(`${location.pathname}/${item.id}`);
  };

  const hideModalAndUpdateUrl = () => {
    hideModal();
    // navigate(location.pathname.replace(`/${item.id}`, ""), { replace: true });
  };

  return (
    <StyledStack>
      <Comments id={item?.id!}>
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
