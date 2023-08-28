import React from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { ILectureSpeakers } from "./LectureSpeakers.types";
import { style } from "./styles";
import UserRow from "../../../../shared/components/UserRow";

const LectureSpeakers: React.FC<ILectureSpeakers> = (props) => {
  const { speakers } = props;

  return (
    <>
      <Paper sx={style.paper}>
        <Typography mb="14px" variant="h5">
          Спикеры
        </Typography>
        <Grid container gap={2}>
          {speakers?.map((item, index) => {
            return (
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                key={index}
                sx={style.stack}
              >
                <UserRow user={item!} width={60} height={60} />
              </Stack>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};

export default LectureSpeakers;
