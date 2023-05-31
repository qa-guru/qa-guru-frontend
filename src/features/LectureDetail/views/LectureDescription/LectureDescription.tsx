import React from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { ILectureDescription } from "./LectureDescription.types";
import { style } from "./styles";

const LectureDescription: React.FC<ILectureDescription> = (props) => {
  const { description } = props;

  return (
    <>
      <Paper sx={style.paper}>
        <Typography mb="14px" variant="h6">
          Содержание урока
        </Typography>
        <Divider />
        <Stack spacing={1.5}>
          {description?.map((value, index) => {
            return (
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                key={index}
                mt="16px"
              >
                <Typography sx={style.circle} variant="subtitle2">
                  {index + 1}
                </Typography>
                <Typography variant="subtitle1">{value}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Paper>
    </>
  );
};

export default LectureDescription;
