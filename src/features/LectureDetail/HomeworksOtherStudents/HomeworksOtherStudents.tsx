import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useModal } from "react-modal-hook";
import { IHomeworksOtherStudents } from "./HomeworksOtherStudents.types";
import { primary } from "../../../theme/colors";
import { HomeworkItem } from "../HomeworkItem";
import Comment from "../Comment/Comment";
import CommentContainer from "../Comment";

const style = {
  paper: { padding: { xs: "15px", md: "20px" } },
  loadMoreBtn: { color: primary.main, margin: "0 auto" },
  scrollContainer: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
};

const ModalWrapper: React.FC<{ item: any; userId: string }> = ({
  item,
  userId,
}) => {
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xl" fullWidth>
      <DialogContent sx={style.scrollContainer} id="scroll-container">
        <HomeworkItem dataHomeWorkByLecture={item} dataUserId={userId} />
        <CommentContainer id={item.id}>
          <Comment />
        </CommentContainer>
      </DialogContent>
    </Dialog>
  ));

  return (
    <Button sx={{ mt: "10px" }} variant="contained" onClick={showModal}>
      Показать
    </Button>
  );
};

const HomeworksOtherStudents: React.FC<IHomeworksOtherStudents> = (props) => {
  const { data, fetchMore, dataUserId } = props;
  const { id: userId } = dataUserId.user!;
  const { items, offset, totalElements, limit } = data.homeWorksByLectureId!;
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);

  useEffect(() => {
    if (items?.length! >= totalElements) {
      setHasMoreHomeworks(false);
    }
  }, [items]);

  const handleLoadMore = () => {
    setLoading(true);
    fetchMore({
      variables: {
        offset: items?.length,
      },
      updateQuery: (
        prev: { homeWorksByLectureId: { items: any } },
        { fetchMoreResult }: any
      ) => {
        if (!fetchMoreResult) return prev;
        return {
          homeWorksByLectureId: {
            ...fetchMoreResult.homeWorksByLectureId,
            items: [
              ...prev.homeWorksByLectureId.items,
              ...fetchMoreResult.homeWorksByLectureId.items,
            ],
          },
        };
      },
    }).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <Stack mb="15px" pt="30px" spacing={1} direction="row">
        <Typography variant="h4">Домашние работы других студентов</Typography>
        <Typography variant="h4">({totalElements})</Typography>
      </Stack>
      <Stack spacing={2}>
        {items?.map((item, index) => {
          return (
            <Paper key={index} sx={style.paper}>
              <HomeworkItem
                dataHomeWorkByLecture={item!}
                dataUserId={userId!}
              />
              <ModalWrapper
                key={`modal-${index}`}
                item={item}
                userId={userId!}
              />
            </Paper>
          );
        })}
      </Stack>
      {hasMoreHomeworks && (
        <Stack mt="15px">
          <LoadingButton
            loading={loading}
            onClick={handleLoadMore}
            sx={style.loadMoreBtn}
            endIcon={<ExpandMoreIcon />}
          >
            Загрузить еще
          </LoadingButton>
        </Stack>
      )}
    </>
  );
};

export default HomeworksOtherStudents;
