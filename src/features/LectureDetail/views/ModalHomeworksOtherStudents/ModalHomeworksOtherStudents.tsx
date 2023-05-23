import React from "react";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogContent, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { IModalHomeworksOtherStudents } from "./ModalHomeworksOtherStudents.types";
import Comments from "../../containers/Comments";
import CommentsPagination from "../CommentsPagination/CommentsPagination";
import HomeworkItem from "../HomeworkItem";
import CommentsTotalElements from "../CommentTotalElements";

const style = {
  scrollContainer: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
  clearIcon: {
    position: "absolute",
    top: "20px",
    right: "23px",
    cursor: "pointer",
    zIndex: "1"
  },
};

const ModalHomeworksOtherStudents: React.FC<IModalHomeworksOtherStudents> = ({
  item,
  dataUserId,
}) => {
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} maxWidth="xl" fullWidth>
      <DialogContent sx={style.scrollContainer} id="scroll-container">
        <ClearIcon sx={style.clearIcon} onClick={hideModal} />
        <HomeworkItem dataHomeWorkByLecture={item} dataUserId={dataUserId} />
        <Comments id={item.id!}>
          <CommentsPagination />
        </Comments>
      </DialogContent>
    </Dialog>
  ));

  return (
    <Stack mt="10px" direction="row" alignItems="center" spacing={2}>
      <Comments id={item?.id!}>
        <CommentsTotalElements />
      </Comments>
      <Button sx={{ mt: "10px" }} variant="contained" onClick={showModal}>
        Показать
      </Button>
    </Stack>
  );
};

export default ModalHomeworksOtherStudents;
