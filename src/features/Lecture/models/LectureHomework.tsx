import React from "react";
import { Box, Typography } from "@mui/material";
import { useLectureHomeWorkQuery } from "../../../generated/graphql";
import { useParams } from "react-router-dom";

const LectureHomework: React.FC = () => {
  const { lessonId } = useParams();
  const { data } = useLectureHomeWorkQuery({
    variables: { lectureId: lessonId! },
  });

  return (
    <>
      <Typography variant="h6">Домашнее задание</Typography>
      <Box>{data?.lectureHomeWork}</Box>
    </>
  );
};

export default LectureHomework;
