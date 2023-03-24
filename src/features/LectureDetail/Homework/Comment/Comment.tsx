import React, { useEffect, useState } from "react";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { format, parseISO } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { IComment } from "./Comment.types";
import UpdateComment from "./UpdateComment";
import SendComment from "./SendComment";
import TextSerialization from "../../../../shared/Serializers/TextSerialization";
import { ReactComponent as Edit } from "../../../../assets/icons/button-edit.svg";
import { grey, primary } from "../../../../theme/colors";

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
  const { totalElements, items, offset } =
    dataCommentsHomeWorkByHomeWork.commentsHomeWorkByHomeWork! || {};
  const { id: idUser } = dataUser.user!;

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
    <Box mt="20px" p="0 15px">
      <Stack spacing={1} direction="row">
        <Typography variant="h5">Комментарии</Typography>
        <Typography variant="h5">({totalElements})</Typography>
      </Stack>
      <Stack mt="5px" spacing={2}>
        {items?.map((item, index) => {
          const isSelected = index === selectedIndex;
          const { creator, content, creationDate, id } = item!;
          const editAccess = idUser === creator?.id;

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
      <SendComment id={id!} />
    </Box>
  );
};

export default Comment;
