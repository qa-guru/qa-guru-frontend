import { FC, useContext } from "react";
import { useModal } from "react-modal-hook";
import { Dialog } from "@mui/material";
import { IHomework } from "./homework.types";
import {
  StyledBox,
  StyledButton,
  StyledClearIcon,
  StyledDialogContent,
  StyledModalBox,
  StyledPaper,
} from "./homework.styled";
import Comments from "../../containers/comments";
import CommentsLimited from "../comments-limited";
import CommentsPagination from "../comments-pagination";
import { LectureIdContext } from "../../context/lecture-id-context";
import HomeworkItem from "../homework-item";

const Homework: FC<IHomework> = (props) => {
  const { dataHomeWorkByLecture, dataUserId } = props;
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
            <Comments id={dataHomeWorkByLecture?.id!}>
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
