import React from "react";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogContent, Stack, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { IModalHomeworksOtherStudents } from "./ModalHomeworksOtherStudents.types";
import { style } from "./styles";
import Comments from "../../containers/Comments";
import CommentsPagination from "../CommentsPagination/CommentsPagination";
import HomeworkItem from "../HomeworkItem";
import CommentsTotalElements from "../CommentTotalElements";

const ModalHomeworksOtherStudents: React.FC<IModalHomeworksOtherStudents> = ({
  item,
  dataUserId,
}) => {
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xl" fullWidth>
      <DialogContent sx={style.scrollContainer} id="scroll-container">
        <ClearIcon sx={style.clearIcon} onClick={hideModal} />
        <Box pt={{ xs: "16px", sm: "0" }}>
          <HomeworkItem dataHomeWorkByLecture={item} dataUserId={dataUserId} />
          <Comments id={item.id!}>
            <CommentsPagination />
          </Comments>
        </Box>
      </DialogContent>
    </Dialog>
  ));

  return (
    <Stack mt="10px" direction="row" alignItems="center" spacing={2}>
      <Comments id={item?.id!}>
        <CommentsTotalElements />
      </Comments>
      <Box>
        <Button variant="contained" onClick={showModal}>
          Показать
        </Button>
      </Box>
    </Stack>
  );
};

export default ModalHomeworksOtherStudents;
