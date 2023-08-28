import React from "react";
import { useModal } from "react-modal-hook";
import { Box, Button, Dialog, DialogContent, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const { modalId } = useParams<{ modalId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModalAndUpdateUrl} maxWidth="xl" fullWidth>
      <DialogContent sx={style.scrollContainer} id="scroll-container">
        <ClearIcon sx={style.clearIcon} onClick={hideModalAndUpdateUrl} />
        <Box pt={{ xs: "16px", sm: "0" }}>
          <HomeworkItem dataHomeWorkByLecture={item} dataUserId={dataUserId} />
          <Comments id={item.id!}>
            <CommentsPagination />
          </Comments>
        </Box>
      </DialogContent>
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
    <Stack mt="10px" direction="row" alignItems="center" spacing={2}>
      <Comments id={item?.id!}>
        <CommentsTotalElements />
      </Comments>
      <Box>
        <Button variant="contained" onClick={showModalAndSetUrl}>
          Показать
        </Button>
      </Box>
    </Stack>
  );
};

export default ModalHomeworksOtherStudents;
