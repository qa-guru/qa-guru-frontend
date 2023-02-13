import React from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { primary, white } from "../../../../theme/colors";
import { ILectureDescription } from "./LectureDescription.types";

const style = {
  paper: { padding: "20px" },
  circle: {
    minWidth: "40px",
    height: "40px",
    bgcolor: primary.main,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: white.main,
  },
};

const LectureDescription: React.FC<ILectureDescription> = (props) => {
  const { description } = props;

  console.log(description);

  return (
    <>
      <Paper sx={style.paper}>
        <Typography mb="14px" variant="h6">
          Содержание урока
        </Typography>
        <Divider />
        <Stack spacing={1.5}>
          {description?.map((value: any, index: any) => {
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
