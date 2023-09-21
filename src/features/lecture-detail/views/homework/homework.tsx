import React, { useContext } from "react";
import { useModal } from "react-modal-hook";
import { Dialog, Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IHomework } from "./homework.types";
import {
  StyledBox,
  StyledButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledPaper,
} from "./homework.styled";
import Comments from "../../containers/comments";
import CommentsLimited from "../comments-limited";
import CommentsPagination from "../comments-pagination";
import { LectureIdContext } from "../../context/lecture-id-context";
import HomeworkItem from "../homework-item";

const Homework: React.FC<IHomework> = (props) => {
  const { dataHomeWorkByLecture, dataUserId } = props;
  const lectureId = useContext(LectureIdContext);
  const { modalId } = useParams<{ modalId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModalAndUpdateUrl} maxWidth="xl" fullWidth>
      <StyledDialogContent id="scroll-container">
        <StyledClearIcon onClick={hideModalAndUpdateUrl} />
        <Box pt={{ xs: "16px", sm: "0" }}>
          <LectureIdContext.Provider value={lectureId}>
            <HomeworkItem
              dataHomeWorkByLecture={dataHomeWorkByLecture}
              dataUserId={dataUserId}
            />
            <Comments id={dataHomeWorkByLecture?.id!}>
              <CommentsPagination />
            </Comments>
          </LectureIdContext.Provider>
        </Box>
      </StyledDialogContent>
    </Dialog>
  ));

  // useEffect(() => {
  //   if (modalId === dataHomeWorkByLecture?.id) {
  //     showModal();
  //   }
  // }, [modalId, showModal, dataHomeWorkByLecture?.id]);

  const showModalAndSetUrl = () => {
    showModal();
    // navigate(`${location.pathname}/${dataHomeWorkByLecture?.id}`);
  };

  const hideModalAndUpdateUrl = () => {
    hideModal();
    // navigate(location.pathname.replace(`/${dataHomeWorkByLecture?.id}`, ""), {
    //   replace: true,
    // });
  };

  return (
    <StyledPaper>
      <HomeworkItem
        dataHomeWorkByLecture={dataHomeWorkByLecture}
        dataUserId={dataUserId}
      />
      {dataHomeWorkByLecture?.id! && (
        <>
          <Comments id={dataHomeWorkByLecture?.id!}>
            <CommentsLimited />
          </Comments>
          <StyledBox>
            <StyledButton variant="contained" onClick={showModalAndSetUrl}>
              Показать другие комментарии
            </StyledButton>
          </StyledBox>
        </>
      )}
    </StyledPaper>
  );
};

export default Homework;
