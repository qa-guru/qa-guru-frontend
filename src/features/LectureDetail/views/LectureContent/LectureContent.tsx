import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { ILectureContent } from "./LectureContent.types";
import ContentSerialization from "../../../../shared/Serializers/ContentSerialization";

const style = {
  paper: { padding: { xs: "15px", md: "20px" } },
};

const LectureContent: React.FC<ILectureContent> = ({ content }) => {
  return (
    <>
      <Typography mb="15px" pt="30px" variant="h4">
        Материалы урока
      </Typography>
      <Paper sx={style.paper}>
        <Stack spacing={0.5}>
          <ContentSerialization content={content} />
        </Stack>
      </Paper>
    </>
  );
};

export default LectureContent;
