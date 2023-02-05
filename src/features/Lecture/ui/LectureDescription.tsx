import React from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";

interface ILectureDescription {
  arrayDescription: string[];
}

const style = {
  paper: { padding: "20px" },
};

const LectureDescription: React.FC<ILectureDescription> = (props) => {
  const { arrayDescription } = props;

  return (
    <>
      <Paper sx={style.paper}>
        <Typography mb="14px" variant="h6">
          Содержание урока
        </Typography>
        <Divider />
        <Stack spacing={1.5}>
          {arrayDescription?.map((item, index) => {
            return (
              <Typography key={index} variant="subtitle1" mt="20px">
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
