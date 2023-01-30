import React from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";

interface ILectureDescription {
  arrayDescription: string[];
}

const LectureDescription: React.FC<ILectureDescription> = (props) => {
  const { arrayDescription } = props;

  return (
    <>
      <Paper sx={{ padding: "20px" }}>
        <Typography mb="14px" variant="h4">
          Содержание урока
        </Typography>
        <Divider />
        <Stack spacing={1.5}>
          {arrayDescription?.map((item, index) => {
            return (
              <Typography key={index} variant="subtitle2" mt="20px">
                {item}
              </Typography>
            );
          })}
        </Stack>
      </Paper>
    </>
  );
};

export default LectureDescription;
