import React, { useEffect, useState } from "react";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { format, parseISO } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { IComment } from "./Comment.types";
import UpdateComment from "./UpdateComment";
import SendComment from "./SendComment";
import TextSerialization from "../../../../shared/TextSerialization";
import { ReactComponent as Edit } from "../../../../assets/icons/button-edit.svg";
import { grey, primary } from "../../../../theme/colors";
import { CommentsHomeWorkByHomeWorkQuery } from "../../../../api/graphql/generated/graphql";

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
  const { dataCommentsHomeWorkByHomeWork, dataUser, fetchMore, id } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [page, setPage] = useState<number>(1);
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork.commentsHomeWorkByHomeWork! || {};
  const { id: idUser } = dataUser.user!;
  const [comments, setComments] = useState<any[]>(items!);

  useEffect(() => {
    if (comments?.length >= totalElements) {
      setHasMoreComments(false);
    }
  }, [comments]);

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
    fetchMore({
      variables: { page },
      updateQuery: (
        previousQueryResult: CommentsHomeWorkByHomeWorkQuery,
        {
          fetchMoreResult,
        }: { fetchMoreResult?: CommentsHomeWorkByHomeWorkQuery }
      ) => {
        if (!fetchMoreResult) return previousQueryResult;
        const newComments = fetchMoreResult.commentsHomeWorkByHomeWork?.items;
        setComments((prevComments) => {
          return [...prevComments, ...newComments!];
        });
      },
    }).then(() => setLoading(false));
  };

  return (
    <Box mt="20px" p="0 15px">
      <Typography variant="h5">Комментарии</Typography>
      <Stack mt="5px" spacing={2}>
        {comments?.map((item, index) => {
          const isSelected = index === selectedIndex;
          const { creator, content, creationDate, id } = item!;

          return (
            <Paper key={index} sx={style.container}>
              <Stack
                alignItems={{ xs: "flex-start", md: "center" }}
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <Box width="100%">
                  <Stack spacing={1.7} direction="row" alignItems="center">
                    <Avatar
                      sx={style.avatar}
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Box>
                      <Typography variant="subtitle1">
                        {creator?.firstName} {creator?.lastName}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2">
                          {format(
                            parseISO(creationDate!),
                            "dd.MM.yyyy '|' HH:mm"
                          )}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Box mt="7px">
                    {isSelected ? (
                      <UpdateComment
                        setComments={setComments}
                        content={content!}
                        setSelectedIndex={setSelectedIndex}
                        id={id!}
                      />
                    ) : (
                      <TextSerialization text={content!} />
                    )}
                  </Box>
                </Box>

                {!isSelected && idUser === creator?.id && (
                  <IconButton onClick={() => setSelectedIndex(index)}>
                    <Edit />
                  </IconButton>
                )}
              </Stack>
            </Paper>
          );
        })}
      </Stack>
      {hasMoreComments && (
        <Stack mt="15px">
          <LoadingButton
            loading={loading}
            onClick={handleLoadMore}
            sx={style.loadMoreBtn}
            variant="outlined"
          >
            Загрузить еще
          </LoadingButton>
        </Stack>
      )}
      <SendComment setComments={setComments} id={id!} />
    </Box>
  );
};

export default Comment;
