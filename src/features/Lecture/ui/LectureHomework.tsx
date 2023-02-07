import React from "react";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";

interface ILectureHomework {
  contentLectureHomeWork: any;
}

const style = {
  paper: { padding: "20px" },
  box: { width: { xs: "100%", sm: "480px" } },
};

const LectureHomework: React.FC<ILectureHomework> = (props) => {
  const { contentLectureHomeWork } = props;

  return (
    <>
      <Typography pt="40px" variant="h4" mb="15px">
        Домашнее задание
      </Typography>
      <Paper sx={style.paper}>
        <Stack spacing={0.5}>
          {contentLectureHomeWork.map((item: any, index: any) => {
            switch (item.type) {
              case "title":
                return (
                  <Typography key={index} variant="h6">
                    {item.value}
                  </Typography>
                );
              case "text":
                return (
                  <Typography key={index} variant="subtitle1">
                    {item.value}
                  </Typography>
                );
              case "video":
                return (
                  <Box key={index} sx={style.box}>
                    <Typography variant="h6">{item.value}</Typography>
                    <ReactPlayer width="100%" height="270px" url={item.url} />
                  </Box>
                );
              case "link":
                return (
                  <Link key={index} underline="hover" href={item.url}>
                    {item.value}
                  </Link>
                );
            }
          })}
        </Stack>
      </Paper>
    </>
  );
};

export default LectureHomework;
