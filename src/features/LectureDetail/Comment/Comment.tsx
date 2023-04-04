import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { IComment } from "./Comment.types";
import UpdateComment from "./UpdateComment";
import SendComment from "./SendComment";
import TextSerialization from "../../../shared/Serializers/TextSerialization";
import { ReactComponent as Edit } from "../../../assets/icons/button-edit.svg";
import { grey, primary } from "../../../theme/colors";
import Profile from "../Profile/Profile";

const style = {
  avatar: {
    width: 40,
    height: 40,
  },
  container: {
    backgroundColor: grey.secondary,
    borderRadius: "12px",
    padding: { xs: "10px", md: "15px" },
  },
  loadMoreBtn: { color: primary.main, margin: "0 auto" },
};

const Comment: React.FC<IComment> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, fetchMore, id } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const { totalElements, items, offset } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork! || {};

  const handleLoadMore = () => {
    setLoading(true);
    fetchMore({
      variables: {
        offset: items?.length,
      },
      updateQuery: (
        prev: { commentsHomeWorkByHomeWork: { items: any } },
        { fetchMoreResult }: any
      ) => {
        if (!fetchMoreResult) return prev;
        return {
          commentsHomeWorkByHomeWork: {
            ...fetchMoreResult.commentsHomeWorkByHomeWork,
            items: [
              ...prev.commentsHomeWorkByHomeWork.items,
              ...fetchMoreResult.commentsHomeWorkByHomeWork.items,
            ],
          },
        };
      },
    }).then(() => setLoading(false));
  };

  useEffect(() => {
    if (items?.length! >= totalElements) {
      setHasMoreComments(false);
    }
  }, [items]);

  return (
    <>
      <SendComment id={id!} />
      <Stack spacing={1} direction="row">
        <Typography variant="h5">Комментарии</Typography>
        <Typography variant="h5">({totalElements})</Typography>
      </Stack>
      <InfiniteScroll
        dataLength={items?.length!}
        next={handleLoadMore}
        hasMore={hasMoreComments}
        loader={
          <Box mt="10px" display="flex" justifyContent="center">
            <CircularProgress size={25} />
          </Box>
        }
        style={{ overflow: "visible" }}
        scrollableTarget="scroll-container"
      >
        <Stack mt="5px" spacing={2}>
          {items?.map((item, index) => {
            const isSelected = index === selectedIndex;
            const { creator, content, creationDate, id } = item!;
            const editAccess = dataUserId?.user?.id === creator?.id;

            return (
              <Paper key={index} sx={style.container}>
                <Stack
                  alignItems={{ xs: "flex-start", md: "center" }}
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Box width="100%">
                    <Profile
                      firstName={creator?.firstName!}
                      lastName={creator?.lastName!}
                      date={creationDate!}
                    />

                    <Box mt="7px">
                      {isSelected ? (
                        <UpdateComment
                          content={content!}
                          setSelectedIndex={setSelectedIndex}
                          id={id!}
                        />
                      ) : (
                        <TextSerialization text={content!} />
                      )}
                    </Box>
                  </Box>

                  {!isSelected && editAccess && (
                    <IconButton onClick={() => setSelectedIndex(index)}>
                      <Edit />
                    </IconButton>
                  )}
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </InfiniteScroll>
    </>
  );
};

export default Comment;
