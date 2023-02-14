import React from "react";
import { IAllHomeworkAnswers } from "./AllHomework.types";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const style = {
  paper: { padding: "30px" },
  wrapper: {
    width: "max-content",
  },
  avatar: {
    width: 40,
    height: 40,
  },
};

const AllHomework: React.FC<IAllHomeworkAnswers> = (props) => {
  const { data } = props;

  return (
    <Paper sx={style.paper}>
      {data?.homeWorksByLectureId?.items?.map((item) => {
        const { answer, status, creationDate, student } = item!;

        return (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
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
                <Typography variant="subtitle2">
                  {student?.firstName} {student?.lastName}
                </Typography>
              </Stack>
              <Box>
                <Typography variant="subtitle1">{status}</Typography>
                <Typography variant="subtitle2">{creationDate}</Typography>
              </Box>
            </Stack>
            <Typography mt="20px" variant="subtitle1">
              {answer}
            </Typography>
          </>
        );
      })}
    </Paper>
  );
};

export default AllHomework;
