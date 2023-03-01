import React, { useEffect, useState } from "react";
import { Stack, Typography, Box, IconButton, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { format, parseISO } from "date-fns";
import { IComment } from "./Comment.types";
import UpdateComment from "./UpdateComment";
import TextSerialization from "../../../../shared/TextSerialization";
import { ReactComponent as Edit } from "../../../../assets/icons/button-edit.svg";

const style = {
  avatar: {
    width: 40,
    height: 40,
  },
  wrapper: {
    width: "max-content",
    mt: "20px",
  },
};

const Comment: React.FC<IComment> = (props) => {
  const { data, setTotalElements } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setTotalElements(data?.commentsHomeWorkByHomeWork?.totalElements);
  }, [data]);

  return (
    <>
      {data?.commentsHomeWorkByHomeWork?.items?.map((item, index) => {
        const isSelected = index === selectedIndex;

        return (
          <Stack
            alignItems="center"
            direction="row"
            key={index}
            justifyContent="space-between"
          >
            <Box width="100%">
              <Stack
                spacing={1.7}
                direction="row"
                alignItems="center"
                sx={style.wrapper}
              >
                <Avatar
                  sx={style.avatar}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
                <Box>
                  <Typography variant="subtitle1">
                    {item?.creator?.firstName} {item?.creator?.lastName}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2">
                      {format(parseISO(item?.creationDate!), "dd.MM.yyyy")}
                    </Typography>
                    <Typography variant="subtitle2">
                      {format(parseISO?.(item?.creationDate!), "HH:mm")}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Box mt="7px">
                {isSelected ? (
                  <UpdateComment
                    content={item?.content!}
                    setSelectedIndex={setSelectedIndex}
                    id={item?.id!}
                  />
                ) : (
                  <TextSerialization text={item?.content!} />
                )}
              </Box>
            </Box>

            <IconButton onClick={() => setSelectedIndex(index)}>
              <Edit />
            </IconButton>
          </Stack>
        );
      })}
    </>
  );
};

export default Comment;
