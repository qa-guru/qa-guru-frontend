import React from "react";
import { Box, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { LectureQuery } from "../../../../generated/graphql";

interface IGetLecture {
  data: LectureQuery;
}

const LectureDetail: React.FC<IGetLecture> = ({ data }) => {
  const { lecture } = data;
  const content = DOMPurify.sanitize(lecture?.content!);

  return (
    <>
      <Typography variant="h2">{lecture?.subject}</Typography>
      <Typography variant="h6">{lecture?.description}</Typography>
      <Box pt="25px" pb="25px">
        <Typography
          variant="subtitle1"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Box>
    </>
  );
};

export default LectureDetail;
