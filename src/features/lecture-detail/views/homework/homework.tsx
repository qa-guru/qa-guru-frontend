import React, { useContext } from "react";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogContent, Paper, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IHomework } from "./homework.types";
import { style } from "./styles";
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
      <DialogContent sx={style.scrollContainer} id="scroll-container">
        <ClearIcon sx={style.clearIcon} onClick={hideModalAndUpdateUrl} />
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
      </DialogContent>
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
    <Paper sx={style.paper}>
      <HomeworkItem
        dataHomeWorkByLecture={dataHomeWorkByLecture}
        dataUserId={dataUserId}
      />
      {dataHomeWorkByLecture?.id! && (
        <>
          <Comments id={dataHomeWorkByLecture?.id!}>
            <CommentsLimited />
          </Comments>
          <Box mt={2}>
            <Button
              sx={style.button}
              variant="contained"
              onClick={showModalAndSetUrl}
            >
              Показать другие комментарии
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Homework;
