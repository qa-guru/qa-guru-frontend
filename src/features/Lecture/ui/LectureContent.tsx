import React from "react";
import { Box, CardMedia, Link, Paper, Stack, Typography } from "@mui/material";

interface ILectureContent {
  contentLecture: any;
}

const style = {
  paper: { padding: "20px" },
  box: {
    overflow: "hidden",
    paddingBottom: "40.25%",
    position: "relative",
    height: 0,
  },
  iframe: {
    left: 0,
    top: 0,
    height: "100%",
    width: "70%",
    position: "absolute",
  },
};

const LectureContent: React.FC<ILectureContent> = (props) => {
  const { contentLecture } = props;

  return (
    <>
      <Typography mb="15px" pt="40px" variant="h4">
        Материалы урока
      </Typography>
      <Paper sx={style.paper}>
        <Stack spacing={0.7}>
          {contentLecture.map((item: any, index: any) => {
            const { value, url, type } = item;

            switch (type) {
              case "title":
                return (
                  <Typography key={index} variant="h6">
                    {value}
                  </Typography>
                );
              case "text":
                return (
                  <Typography key={index} variant="subtitle1">
                    {value}
                  </Typography>
                );
              case "video":
                return (
                  <Box key={index}>
                    <Typography variant="h6">{value}</Typography>
                    <CardMedia image={url} />
                    <Box sx={style.box}>
                      <iframe
                        // @ts-ignore
                        style={style.iframe}
                        src={`https://www.youtube.com/embed/${url}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                    </Box>
                  </Box>
                );
              case "link":
                return (
                  <Link key={index} underline="hover" href={url}>
                    {value}
                  </Link>
                );
            }
          })}
        </Stack>
      </Paper>
    </>
  );
};

export default LectureContent;
